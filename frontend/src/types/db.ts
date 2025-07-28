export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "member";
}

export interface Patient {
  _id: string;
  no: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  telephone: string;
  email: string;
  status: number;
}
