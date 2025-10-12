export type UserState = {
  loggedIn: boolean;
  user: User | null;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  sessionId: string;
};
export type LoginUser = {
  email: string;
  password: string;
};
