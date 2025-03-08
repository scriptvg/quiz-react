async function GetTasks(userId) {
    try {
        const response = await fetch(`http://localhost:3001/tareas?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching tasks');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

async function PostTask(title, description, completed, userId) {
    try {
        const taskData = { title, description, completed, userId };

        const response = await fetch("http://localhost:3001/tareas", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            throw new Error('Error posting task');
        }

        return await response.json();
    } catch (error) {
        console.error('Error posting task:', error);
        throw error;
    }
}

async function UpdateTask(title, description, completed, id, userId) {
    try {
        const taskData = { title, description, completed, id, userId };

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
}

async function DeleteTask(id, userId) {
    try {
        const response = await fetch(`http://localhost:3001/tareas/${id}?userId=${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting task with id ${id}`);
        }

        return { message: `Task with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}

export default { GetTasks, PostTask, UpdateTask, DeleteTask };
