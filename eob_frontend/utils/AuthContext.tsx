import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthContextType {
  user: any; // hoặc kiểu cụ thể của user (e.g., UserType | null)
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("access");
    const storedUser = localStorage.getItem("user");
    if (storedAccessToken && storedUser) {
      setAccessToken(storedAccessToken);
      setUser(JSON.parse(storedUser));
    }
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/login/",
        {
          email,
          password,
        }
      );
      const { access, refresh, user } = response.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log("Đăng nhập thất bại", error);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh");
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/token/refresh/",
        {
          refresh: refreshToken,
        }
      );
      const { access } = response.data;
      localStorage.setItem("access", access);
    } catch (error) {
      console.log("Lỗi refresh token", error);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  useContext(AuthContext);
};
