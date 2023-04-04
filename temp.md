## hello

```javascript

const client_id = 'YOUR_CLIENT_ID';
const redirect_uri = 'YOUR_REDIRECT_URI';
const login = 'OPTIONAL_LOGIN_VALUE';
const scope = 'OPTIONAL_SPACE_DELIMITED_SCOPES';
const state = 'OPTIONAL_RANDOM_STRING';
const allow_signup = 'OPTIONAL_BOOLEAN_VALUE';

const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&login=${login}&scope=${scope}&state=${state}&allow_signup=${allow_signup}`;

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```