import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigation, useParams } from "react-router-dom";
import { fetchTask, updateTask, deleteTask } from "./api";

function TaskDetail() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams();
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const task = await fetchTask(id);
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    await updateTask(id, { title, description, status });
    navigation.navigate("/tasks");
  }

  async function handleDelete() {
    setIsDeleting(true);
    await deleteTask(id);
    navigation.navigate("/tasks");
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isLoading}>
            Update
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            Delete
          </Button>
        </Form>
      )}
    </>
  );
}

export default TaskDetail;