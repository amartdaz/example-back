export class JwtPayload {
  id: number;
  password: string;
  username: string;
  name: string;
  surname: string;
  iat: number;
  exp: number;
}