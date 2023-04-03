import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form } from "react-bootstrap";
import { Octokit } from "@octokit/core";
import { useAuth } from "../contexts/AuthContext";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const { accessToken } = useAuth();

  useEffect(() => {
    const octokit = new Octokit({ auth: accessToken });

    async function fetchIssues() {
      setLoading(true);

      try {
        const response = await octokit.request("GET /user/issues", {
          filter: filter,
          state: "all",
          sort: sort === "newest" ? "created" : "created-desc",
          per_page: 10,
        });

        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchIssues();
  }, [accessToken, filter, sort]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Form.Group controlId="filter">
            <Form.Label>Filter by:</Form.Label>
            <Form.Control
              as="select"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="assigned">Assigned to me</option>
              <option value="created">Created by me</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="sort">
            <Form.Label>Sort by:</Form.Label>
            <Form.Control as="select" value={sort} onChange={handleSortChange}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.number}</td>
                <td>{task.title}</td>
                <td>{task.state}</td>
                <td>{new Date(task.created_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default TaskList;
