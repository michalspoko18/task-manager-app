import { useState, useEffect } from "react";
import api from "../api";
import Task from "../components/Task"

function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDue_Date] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    api
      .get("/api/tasks/")
      .then((res) => res.data)
      .then((data) => {
        setTasks(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteTask = (id) => {
    api
      .delete(`/api/tasks/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Task deleted!");
        else alert("Faild to delete task");
        getTasks();
      })
      .catch((error) => alert(error));
  };

  const createTask = (e) => {
    e.preventDefault();
    api
      .post("/api/tasks/", { title, description, status })
      .then((res) => {
        if (res.status === 201) alert("Task created!");
        else alert("Failed to make task.");
        getTasks();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <h2>Tasks</h2>
        {tasks.map((task) => <Task task={task} onDelete={deleteTask} key={task.id} />)}
      </div>
      <h2>Create a Task</h2>
      <form onSubmit={createTask}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          name="description"
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <label htmlFor="Status">Status</label>
        <br />
        <input
          type="text"
          id="status"
          name="status"
          required
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Home;
