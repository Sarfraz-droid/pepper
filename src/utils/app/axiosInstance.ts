import axios, { isAxiosError } from "axios";

export const instance = axios.create({
  baseURL: "",
  withCredentials: true,
});

const readToken = () => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

instance.interceptors.request.use((config) => {
  const token = readToken();
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(undefined, (error) => {
  if (
    isAxiosError(error) &&
    error.response?.status === 401 &&
    typeof window !== "undefined" &&
    window.location.pathname === "/admin"
  ) {
    window.location.href = "/admin/login";
  }
  return Promise.reject(error);
});

export const getErrorMessage = (error: unknown, fallback = "Something went wrong") => {
  if (isAxiosError(error)) {
    return (error.response?.data as { error?: string })?.error ?? error.message ?? fallback;
  }
  return error instanceof Error ? error.message : fallback;
};

export const setSession = (token: string) => {
  const maxAge = 60 * 60 * 24 * 30;
  document.cookie = `token=${token}; path=/; max-age=${maxAge}; samesite=lax`;
};

export const clearSession = () => {
  document.cookie = "token=; path=/; max-age=0";
  // Sessions created by older versions stored the cookie on /admin.
  document.cookie = "token=; path=/admin; max-age=0";
  try {
    window.localStorage.removeItem("token");
  } catch {}
};
