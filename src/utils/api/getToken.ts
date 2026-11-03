import sha256 from "crypto-js/sha256";

export const createToken = (username: string, password: string) =>
  sha256(`${username}:${password}`).toString();

export const verifyToken = (token: string) =>
  !!process.env.NEXT_PUBLIC_ID &&
  !!process.env.NEXT_PUBLIC_PASSWORD &&
  token === createToken(process.env.NEXT_PUBLIC_ID, process.env.NEXT_PUBLIC_PASSWORD);
