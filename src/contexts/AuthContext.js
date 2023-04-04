import { createContext, useState } from "react";

const defaultValue = {
  token: "this is the token in context",
  setToken: () => {},
};

export const AuthContext = createContext(defaultValue);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(defaultValue.token);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
