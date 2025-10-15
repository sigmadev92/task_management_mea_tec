export type UserState = {
  loggedIn: boolean;
  user: User | null;
};

export type User = {
  id: string;
  fullName: string;
  username: string;
  password: string;
  sessionId: string;
};
export type LoginUser = {
  username: string;
  password: string;
};
