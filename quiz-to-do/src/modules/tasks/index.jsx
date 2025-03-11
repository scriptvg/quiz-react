import TaskForm from '../../components/tasks/TaskForm';
import TaskList from '../../components/tasks/TaskList';
import TaskItem from '../../components/tasks/TaskItem';
import TaskSearch from '../../components/tasks/TaskSearch';
import TaskCategories from '../../components/tasks/TaskCategories';
import TaskStats from '../../components/dashboard/TaskStats';

export {
  TaskForm,
  TaskList,
  TaskItem,
  TaskSearch,
  TaskCategories,
  TaskStats
};

// Task utilities
export const getTaskStatus = (task) => {
  if (task.completed) return 'completed';
  return 'todo';
};

export const filterTasks = (tasks, filters) => {
  return tasks.filter(task => {
    if (filters.status && getTaskStatus(task) !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });
};

export const sortTasks = (tasks, sortBy = 'dueDate') => {
  return [...tasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });
};