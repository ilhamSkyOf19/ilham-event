import { Request } from "express";
import { PayloadJwtType } from "../models/jwt-model";

export type ResponseType<T> = {
  status: "success" | "failed";
  message: string;
  data: T;
};

// auth request
export interface AuthRequestType<params = {}, _ = {}, body = {}, query = {}>
  extends Request<params, _, body, query> {
  data?: PayloadJwtType;
}
