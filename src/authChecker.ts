import { AuthChecker } from 'type-graphql';
import { Context } from './context';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authChecker: AuthChecker<Context> = ({ context }) => {
  const decodedToken: any = jwt.verify(context.token, process.env.SECRET_KEY!);

  if (Date.now() >= decodedToken.exp * 1000) {
    return false;
  }

  return true;
};
