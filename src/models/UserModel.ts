import { IsEmail, IsString } from 'class-validator';
import { Schema, Document, model } from 'mongoose';

interface IUser {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface IUserModel extends IUser, Document {}

// Export schema database
const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const User = model<IUserModel>('users', UserSchema);

// VALIDATOR
class UserCreateBody {
  @IsEmail()
  public email: string;
  @IsString()
  public username: string;
  @IsString()
  public password: string;
}

export { IUser, User, UserCreateBody };
