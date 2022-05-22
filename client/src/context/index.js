import React, { useState } from "react";

export const UserContext = React.createContext("");

export default function UserContextProver({ children }) {
  const [user, setUser] = useState(null);
  const [sub, setSub] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser , sub, setSub }}>
      {children}
    </UserContext.Provider>
  );
}
