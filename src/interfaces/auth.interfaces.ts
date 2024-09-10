export interface IAuth {
  statusCode: number;
  message: string;
  token: string;
}

export interface IBodyAuth {
  email: string;
  password: string;
}
