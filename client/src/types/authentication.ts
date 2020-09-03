export type LoginPageProps = {};
export type RegistrationPageProps = {};
export type HomePageProps = {};
export type AppProps = {};

export type LoginData = {
  email: string;
  password: string;
};

export type UserFormData = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  _id: string; // mongo ID converted to string from ObjectID
  name: string;
  email: string; // validator
  date: Date;
};
