export interface AuthResponseData {
  accessToken: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
}
