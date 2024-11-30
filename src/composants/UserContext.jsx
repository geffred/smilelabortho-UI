import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  // Lire les données utilisateur depuis localStorage ou initialiser à null
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Mettre à jour localStorage lorsque l'utilisateur change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Fonctions pour gérer la connexion et la déconnexion
  const loginUser = (userData) => {
    setUser(userData); // Mettre à jour le contexte et localStorage
  };

  const logoutUser = () => {
    setUser(null); // Supprimer l'utilisateur du contexte et de localStorage
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}
