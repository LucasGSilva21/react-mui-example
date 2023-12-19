import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LoginService } from "../services/api/auth/LoginService";

interface IAuthContext {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext({} as IAuthContext);

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = "APP_ACCESS_TOKEN";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    if (accessToken) {
      setAccessToken(accessToken);
    } else {
      setAccessToken(undefined);
    }
  }, []);

  const handlelogin = useCallback(async (email: string, password: string) => {
    const result = await LoginService.login(email, password);
    localStorage.setItem(
      LOCAL_STORAGE_KEY_ACCESS_TOKEN,
      JSON.stringify(result.accessToken)
    );
    setAccessToken(result.accessToken);
  }, []);

  const handleLogout = useCallback(async () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login: handlelogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
