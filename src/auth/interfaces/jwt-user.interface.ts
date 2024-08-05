export interface JwtUser {
  user: string;
  name: string;
  role: string;
  userId: string;
  iat?: number,
  exp?: number
}
