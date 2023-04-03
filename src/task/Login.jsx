import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigation } from "react-router-dom";
import { useAuth } from "./auth";

function Login() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login();
      navigation.navigate("/tasks");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Button onClick={handleLogin} disabled={loading}>
        Login with GitHub
      </Button>
    </div>
  );
}

export default Login;
