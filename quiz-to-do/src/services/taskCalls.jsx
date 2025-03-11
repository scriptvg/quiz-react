const GetTasks = async () => {
    try {
        const response = await fetch('http://localhost:3001/tareas');
        if (!response.ok) {
            throw new Error('Error fetching tasks');
        }
        return await response.json();
    } catch (error) {
        console.error('Error getting tasks:', error);
        throw error;
    }
};

const PostTask = async (title, description, completed, userId, dueDate, priority, createdAt) => {
    try {
        const taskData = { 
            title, 
            description, 
            completed,
            userId,
            status: 'todo',
            dueDate,
            priority,
            createdAt: new Date().toISOString()
        };

        const response = await fetch('http://localhost:3001/tareas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            throw new Error('Error creating task');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

const UpdateTask = async (title, description, completed, id, userId, status) => {
    try {
        const taskData = { 
            title, 
            description, 
            completed, 
            id, 
            userId,
            status 
        };
        const response = await fetch(`http://localhost:3001/tareas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            throw new Error(`Error updating task with id ${id}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

const DeleteTask = async (id) => {
    try {
        const response = await fetch(`http://localhost:3001/tareas/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error deleting task with id ${id}`);
        }

        return true;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

const taskCalls = {
    GetTasks,
    PostTask,
    UpdateTask,
    DeleteTask
};

export default taskCalls;
