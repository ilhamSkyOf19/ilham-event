import crypto from "crypto";

// encrypt
export const encrypt = (password: string): string => {
  const encrypted = crypto
    .pbkdf2Sync(password, process.env.SECRET || "", 1000, 64, "sha512")
    .toString("hex");

  return encrypted;
};
