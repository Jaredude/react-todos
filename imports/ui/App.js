import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import TaskList from './TaskList.js';

const App = (props, state) => {
  const useData = () => useTracker(() => {
    Meteor.subscribe('tasks');

    return {
      tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
      incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
      currentUser: Meteor.user(),
    };
  }, []);

  const { tasks, incompleteCount, currentUser } = useData();

  const [hideCompleted, setHideComplete] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isnewTaskPrivate, setIsNewTaskPrivate] = useState(false)

  const toggleHideCompleted = () => setHideComplete(!hideCompleted);
  const newTaskDescriptionOnChange = e => setNewTaskDescription(e.target.value);
  const newTaskPrivate = e => setIsNewTaskPrivate(e.target.checked);

  const handleSubmit = (event) => {
    event.preventDefault();

    Meteor.call('tasks.insert', 
      {
        taskDescription: newTaskDescription,
        isPrivate: isnewTaskPrivate
      }
    );

    // // Clear form
    setNewTaskDescription('');
  };


  return (
    <div className="container">
      <header>
        <h1>Todo List ({incompleteCount})</h1>

        <label className="hide-completed">
          <input
            type="checkbox"
            readOnly
            checked={hideCompleted}
            onClick={toggleHideCompleted}
          />
          Hide Completed Tasks
      </label>

        <AccountsUIWrapper />

        {currentUser ?
          <form className="new-task" onSubmit={handleSubmit} >
            <div style={{ display: 'flex' }}>
              <input type="checkbox" onChange={newTaskPrivate} checked={isnewTaskPrivate} style={{width:"20px", alignSelf:"center"}} />
              <input
                type="text"
                placeholder="Type to add new tasks"
                onChange={newTaskDescriptionOnChange}
                value={newTaskDescription}
              />
            </div>
          </form> : ''
        }
      </header>
      <TaskList
        tasks={tasks}
        hideCompleted={hideCompleted}
        currentUser={currentUser}
      />
    </div>
  )
}

export default App;
