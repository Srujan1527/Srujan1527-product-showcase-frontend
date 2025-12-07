export interface User {
  name: string;
  email: string;
  phoneNumber: number;
  password: string;
}

export function saveAuth(token: string, user: User) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUser() {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
