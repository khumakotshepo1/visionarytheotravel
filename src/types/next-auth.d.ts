// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { JWT } from "next-auth/jwt";

import { Session } from "next-auth";

type UserId = number;
type UserName = string;
type UserRole = string;
type UserEmail = string;
type UserImage = string;
type UserEmailVerified = boolean;
type UserPassword = string;
type UserPhone = string;
type UserCreatedAt = Date;
type UserUpdatedAt = Date;

declare module "next-auth" {
  interface NextAuthRequest {
    session?: Session;
  }

  interface User {
    user_id: UserId;
    first_name: UserName;
    last_name: UserName;
    role: UserRole;
    email: UserEmail;
    email_verified: UserEmailVerified;
    phone: UserPhone;
    image: UserImage;
    password: UserPassword;
    created_at: UserCreatedAt;
    updated_at: UserUpdatedAt;
  }
}

interface Session {
  user: User;
}

declare module "next-auth/jwt" {
  interface JWT {
    user_id: UserId;
    first_name: UserName;
    last_name: UserName;
    role: UserRole;
    email: UserEmail;
    email_verified: UserEmailVerified;
    phone: UserPhone;
    image: UserImage;
    password: UserPassword;
    created_at: UserCreatedAt;
    updated_at: UserUpdatedAt;
  }
}
