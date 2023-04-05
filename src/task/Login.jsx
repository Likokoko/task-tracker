import React, { useEffect, useState } from "react";
import { getToken, setToken } from "../utils/token";

import { Button } from "react-bootstrap";
import { UrlParser } from "url-params-parser";
import { useAuth } from "./useAuth";

// import { useNavigation } from "react-router-dom";
const {
  REACT_APP_PROXY_URL,
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_REDIRECT_URI,
  REACT_APP_TOKEN_URL,
  REACT_APP_AUTH_URL,
} = process.env;

// node environment

function Login() {
  // const navigation = useNavigation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  console.log("my token: ", getToken());

  useEffect(() => {
    const getToken = async (code) => {
      /**
       * browser request ->
       * http://localhost:8080 (proxy: github)
       * 8080 -> github
       * github response -> 8080 (no CORS)
       * 8080 response -> 3000
       */
      return fetch(
        `${REACT_APP_PROXY_URL}${REACT_APP_TOKEN_URL}?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&redirect_uri=${REACT_APP_REDIRECT_URI}&code=${code}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.access_token) setToken(res.access_token);
          throw new Error();
        })
        .catch((error) => {
          console.log(
            "Please get a new code by clicking login with github link",
            error
          );
        });
    };

    const parser = UrlParser(window.location.href);
    const q = parser.queryParams;
    if (q.code) {
      getToken(q.code);
    } else {
      console.log("no code...");
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-container"
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
    >
      <a
        href={`${REACT_APP_AUTH_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URI}&login=Likokoko&scope=repo&allow_signup=false`}
      >
        Login with GitHub
      </a>
    </div>
  );
}

export default Login;
