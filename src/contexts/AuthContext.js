import { createContext, useEffect, useState } from "react";

import { setToken as setLocalToken } from "../utils/token";

const defaultValue = {
  token: undefined,
  setToken: () => {},
};

export const AuthContext = createContext(defaultValue);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(defaultValue.token);

  useEffect(() => setLocalToken(token), [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children /** rerender */}
    </AuthContext.Provider>
  );
};
