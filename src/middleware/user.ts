import { NextFunction, Request, Response } from 'express';
import User from '../entities/User';
import jwt from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) return next();

    const { username }: any = jwt.verify(token, process.env.JWT_SECRET!);
    //{ username: 'jane', iat: 1639503081 }

    const user = await User.findOne({ username });

    if (!user) throw new Error('Unauthenticated');

    res.locals.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthenticated' });
  }
};
