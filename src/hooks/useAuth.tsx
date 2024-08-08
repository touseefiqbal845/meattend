import { ReactNode, createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

// Define the shape of the context
interface AuthContextType {
  user: any;
  login: (data: any) => void;
  logout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // Authenticate the user
  const login = async (data: string) => {
    setUser(data);
    navigate("/login");
  };

  // Sign out the user

  const logout = async () => {
    localStorage.clear(); 
    setUser(null);
    navigate("/", { replace: true });
  };
 
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
