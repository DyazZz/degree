export interface Team {
  id: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: string | null;
  createdAt: Date;
  updatedAt: Date;
}
