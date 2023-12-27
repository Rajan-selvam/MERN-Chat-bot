import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { COOKIE_NAME } from "./constants";

export const createToken = (id: String, email: String, expiresIn: any) => {
  const payload = { id, email };
  const token = sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {  
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    return res.status(401).json({
      message: "Token Not Exist"
    })
  }
  return new Promise<void>((resolve, reject) => {
    return verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({
          message: "Token Expired",
        });
      } else {
        // console.log("Token Verification Successed");
        resolve()
        res.locals.jwtData = success
        return next()
      }
    });
  });
};
