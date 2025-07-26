import jwt from "jsonwebtoken";

/* == Generate token function == */
export const generateToken = ({
  publicClaims,
  registeredClaims,
  secretKey,
}) => {
  return jwt.sign(publicClaims, secretKey, registeredClaims);
};

/* == Verify token function == */
export const verifyToken = ({ token, secretKey }) => {
  return jwt.verify(token, secretKey);
};
