import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import * as userModel from '../models/userModel';

interface RegisterData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  profilePicture?: string;
  address?: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const register = async (data: RegisterData): Promise<User> => {
  const { email, password, name, phone, profilePicture, address } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  return userModel.createUser({
    email,
    password: hashedPassword,
    name: name ?? null,
    phone: phone ?? null,
    profilePicture: profilePicture ?? null,
    address: address ?? null,
  });
};

export const login = async (data: LoginData): Promise<{ token: string }> => {
  const { email, password } = data;
  const user = await userModel.getUserByEmail(email);
  if (user && (await bcrypt.compare(password, user.password))) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
    return { token };
  } else {
    throw new Error('Invalid credentials');
  }
};
