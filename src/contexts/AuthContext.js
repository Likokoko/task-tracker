import { createContext, useState } from "react";

const defaultValue = {
  token: undefined,
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
      { children /** rerender */ }
    </AuthContext.Provider>
  );
};
