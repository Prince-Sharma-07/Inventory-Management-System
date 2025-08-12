import jwt from "jsonwebtoken";

type Payload = {
  id: string;
};

export function createToken(data: Payload) {
  const token = jwt.sign(data, process.env.JWT_SECRET as string);
  return token;
}

export function verifyToken(token: string) {
  try {
    const decryptedData = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;
    return decryptedData as Payload;
  } catch (err) {
    return null;
  }
}
