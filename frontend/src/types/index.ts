export interface User {
  username: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  owner_id: number;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface ProtectedResponse {
  message: string;
  username: string;
}
