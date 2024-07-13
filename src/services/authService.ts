import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

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
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      phone,
      profilePicture,
      address,
    },
  });
  return user;
};

export const login = async (data: LoginData): Promise<{ token: string }> => {
  const { email, password } = data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
  } else {
    throw new Error('Invalid credentials');
  }
};
