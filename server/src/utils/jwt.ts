import { PayloadJwtType } from "../models/jwt-model";
import jwt from "jsonwebtoken";

// generate token
export const generateJwt = (payload: PayloadJwtType): string => {
  // generate token
  return jwt.sign(payload, process.env.SECRET || "", {
    expiresIn: "1h",
  });
};

// verify jwt
export const verifyJwt = (token: string): PayloadJwtType =>
  jwt.verify(token, process.env.SECRET || "") as PayloadJwtType;
