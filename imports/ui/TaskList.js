import React from 'react';
import Task from './Task';

// Made the rendering of the TaskList a rafce instead of a function call in App.js
const TaskList = ({ tasks: filteredTasks, hideCompleted, currentUser }) => {
    if (hideCompleted) {
        filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    const currentUserId = currentUser && currentUser._id;

    return <ul>
        {filteredTasks.map((task) => {
            const showPrivateButton = task.owner === currentUserId;
            return (<Task
                key={task._id}
                task={task}
                showPrivateButton={showPrivateButton}
            />)
        })}
    </ul>;
}

export default TaskList;