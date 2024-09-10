import React from "react";
import "../styles/Task.scss"

function Task({ task, onDelete }) {
    
  return (
    <div className="task-container">
      <p className="task-title">{task.title}</p>
      <p className="task-description">{task.description}</p>
      <p className="task-status">{task.status}</p>
      <p className="task-date">{task.due_date}</p>
      <button className="delete-button" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}

export default Task