import React, { createContext, useContext, useState, useCallback } from 'react';
import taskCalls from '../services/taskCalls';
import { useAuth } from '../services/Auth';
import Swal from 'sweetalert2';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  const loadTasks = useCallback(async () => {
    try {
      const userTasks = await taskCalls.GetTasks();
      setTasks(userTasks.filter(task => task.userId === user.id));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load tasks'
      });
    }
  }, [user]);

  const addTask = async (newTask) => {
    try {
      const addedTask = await taskCalls.PostTask(
        newTask.title,
        newTask.description,
        false,
        user.id,
        'todo'
      );
      setTasks(prev => [...prev, addedTask]);
      return true;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add task'
      });
      return false;
    }
  };

  const updateTask = async (taskToUpdate) => {
    try {
      await taskCalls.UpdateTask(
        taskToUpdate.title,
        taskToUpdate.description,
        taskToUpdate.completed,
        taskToUpdate.id,
        taskToUpdate.userId,
        taskToUpdate.status
      );
      await loadTasks();
      return true;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update task'
      });
      return false;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await taskCalls.DeleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
      return true;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete task'
      });
      return false;
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      loadTasks,
      addTask,
      updateTask,
      deleteTask
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);