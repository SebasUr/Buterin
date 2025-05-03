"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext(null);

const LOGIN_REDIRECT_URL = "/"
const LOGOUT_REDIRECT_URL = "/login"
const LOGIN_REQUIRED_URL = "/login"

const LOCAL_STORAGE_KEY = "is-authenticated";
const LOCAL_USERNAME_KEY = "username";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const storageValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storageValue) {
      const storageAuthSatusInt = parseInt(storageValue);
      setIsAuthenticated(storageAuthSatusInt === 1);
    }
    const storedUn = localStorage.getItem(LOCAL_USERNAME_KEY);
    if (storedUn) {
      setUsername(storedUn);
    }
  }, []);

  const login = (username) => {
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, "1");
    if (username)  {
      localStorage.setItem(LOCAL_USERNAME_KEY, username);
      setUsername(username);
    } else {
      localStorage.removeItem(LOCAL_USERNAME_KEY);
    }
    const nextUrl = searchParams.get("next");
    const nextUrlValid = nextUrl && nextUrl.startsWith("/") && !["/login", "/logout"].includes(nextUrl);
    if (nextUrlValid) {
      router.replace(nextUrl);
      return;
    } else {
      router.replace(LOGIN_REDIRECT_URL);
      return;
    }
  }

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");
    router.replace(LOGOUT_REDIRECT_URL);
  }

  const loginRequiredRedirect = () => {
    // prevent repetitive redirection to login page
    const storageValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storageValue) {
      const storageAuthSatusInt = parseInt(storageValue);
      if (storageAuthSatusInt === 1) {
        return;
      }
    }
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");
    let loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathName}`;
    if (LOGIN_REQUIRED_URL === pathName) {
      loginWithNextUrl = `${LOGIN_REQUIRED_URL}`;
    }
    router.replace(loginWithNextUrl);
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout, loginRequiredRedirect, username}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}