export type createUser = {
  name: string;
  email: string;
  password: string;
};

export type login = {
  email: string;
  password: string;
};

export type listUsers = {
  name: string;
  email: string;
  hash: string;
  is_adm: boolean;
  created_at: Date;
};

export type deleteUser = {
  email: string;
};
