const scope = "user:email repo";
const redirectUri = "http://localhost:3000";
const clientId = "1a201b767edb0163c163";
const state = "12321";
const apiBaseUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
const client_secret = 'a2fbe993ad66033ab7905453d4d5aa44e0ab0dab';

const response = await fetch(accessTokenUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
    redirect_uri: redirectUri,
    state: state
  })
});



async function fetchTasks() {
  const response = await fetch(`${apiBaseUrl}/tasks`);
  return response.json();
}

async function fetchTask(id) {
  const response = await fetch(`${apiBaseUrl}/tasks/${id}`);
  return response.json();
}

async function createTask(taskData) {
  const response = await fetch(`${apiBaseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  return response.json();
}

async function updateTask(id, taskData) {
  const response = await fetch(`${apiBaseUrl}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  return response.json();
}

async function deleteTask(id) {
  const response = await fetch(`${apiBaseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

export { fetchTasks, fetchTask, createTask, updateTask, deleteTask };
