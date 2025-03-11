import React, { useState, useEffect, memo } from 'react';
import { useAuth } from '../../services/Auth';
import taskCalls from '../../services/taskCalls';
import TaskItem from './TaskItem';
import Sortable from 'sortablejs';
import Swal from 'sweetalert2';
import { Alert } from 'react-bootstrap';
import TaskCategories from './TaskCategories';
import TaskSearch from './TaskSearch';

const TaskList = memo(({ status }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const handleDragEnd = async (event) => {
    if (!event.to || !event.item) return;
    
    const taskId = parseInt(event.item.getAttribute('data-task-id'));
    const newStatus = event.to.id.replace('taskList-', '');
    const fromStatus = event.from.id.replace('taskList-', '');
    
    if (newStatus === fromStatus) return;
    
    try {
      const taskToUpdate = tasks.find(t => t.id === taskId);
      if (!taskToUpdate) return;

      const updatedTask = {
        ...taskToUpdate,
        status: newStatus,
        completed: newStatus === 'completed'
      };

      await taskCalls.UpdateTask(
        updatedTask.title,
        updatedTask.description,
        updatedTask.completed,
        updatedTask.id,
        updatedTask.userId,
        updatedTask.status
      );
      
      await loadTasks();
      
      Swal.fire({
        icon: 'success',
        title: 'Task Updated',
        text: 'Task status has been updated successfully',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error updating task:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update task status'
      });
      
      await loadTasks();
    }
  };

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const userTasks = await taskCalls.GetTasks();
      setTasks(userTasks.filter(task => 
        task.userId === user.id && task.status === status
      ));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load tasks'
      });
    } finally {
      setLoading(false);
    }
  }, [user.id, status]);
  
  useEffect(() => {
    loadTasks();
    const taskList = document.getElementById(`taskList-${status}`);
    if (taskList) {
      Sortable.create(taskList, {
        animation: 150,
        group: 'shared-tasks',
        ghostClass: 'bg-light',
        onEnd: handleDragEnd,
        dragClass: 'sortable-drag',
        chosenClass: 'sortable-chosen',
        draggable: '.task-card',
        handle: '.cursor-move',
        forceFallback: true,
        fallbackClass: 'sortable-fallback'
      });
    }
  }, [status, loadTasks]);



  const handleAddTask = async (newTask) => {
    try {
      await taskCalls.PostTask(
        newTask.title,
        newTask.description,
        false,
        user.id,
        'todo'
      );
      await loadTasks();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Task added successfully',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add task'
      });
    }
  };

  const handleComplete = async (task) => {
    try {
      const updatedTask = {
        ...task,
        completed: !task.completed,
        status: task.status
      };

      await taskCalls.UpdateTask(
        updatedTask.title,
        updatedTask.description,
        updatedTask.completed,
        updatedTask.id,
        updatedTask.userId,
        updatedTask.status
      );
      await loadTasks();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update task'
      });
    }
  };

  const handleDelete = async (task) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await taskCalls.DeleteTask(task.id);
        await loadTasks();
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Task has been deleted.',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete task'
        });
      }
    }
  };

  const handleDragEnd = async (event) => {
    if (!event.to || !event.item) return;
    
    const taskId = parseInt(event.item.getAttribute('data-task-id'));
    const newStatus = event.to.id.replace('taskList-', '');
    const fromStatus = event.from.id.replace('taskList-', '');
    
    if (newStatus === fromStatus) return;
    
    try {
      const taskToUpdate = tasks.find(t => t.id === taskId);
      if (!taskToUpdate) return;

      const updatedTask = {
        ...taskToUpdate,
        status: newStatus,
        completed: newStatus === 'completed'
      };

      await taskCalls.UpdateTask(
        updatedTask.title,
        updatedTask.description,
        updatedTask.completed,
        updatedTask.id,
        updatedTask.userId,
        updatedTask.status
      );
      
      // Reload tasks for all affected columns
      await loadTasks();
      
      Swal.fire({
        icon: 'success',
        title: 'Task Updated',
        text: 'Task status has been updated successfully',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error updating task:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update task status'
      });
      
      // Reload tasks to restore original state
      await loadTasks();
    }
  };

  const filteredTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });

  if (loading) {
    return <Alert variant="info">Loading tasks...</Alert>;
  }

  return (
    <div>
      <TaskSearch 
        onSearch={setSearchQuery}
        onFilterChange={setPriorityFilter}
      />
      <TaskCategories
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div id={`taskList-${status}`} className="task-list">
        {filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
        ))}
        {filteredTasks.length === 0 && (
          <Alert variant="light" className="text-center">
            No tasks found
          </Alert>
        )}
      </div>
    </div>
  );
});

export default TaskList;