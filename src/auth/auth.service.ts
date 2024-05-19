// auth/users.service.ts

import { ConflictException, HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { CreateUserDto, UpdateUserDto, LoginDto } from '../auth/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) {}

    async getUser(id: string): Promise<User | null> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user.toObject({ versionKey: false, transform: (_, ret) => { delete ret.password; return ret; } });
    }

  async registerUser(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    try {

        // Check if username already exists
      const existingUser = await this.userModel.findOne({ username: createUserDto.username }).exec();
      if (existingUser) {
        throw new ConflictException('Username already registered');
      }

      // Hash user's password
      const hashedPassword = await hash(createUserDto.password, 10);

      // Create new user
      const newUser = new this.userModel({
        password: hashedPassword,
        username: createUserDto.username,
      });

      // Save new user to the database
      const savedUser = await newUser.save();

      // Create payload for JWT
      const payload = {
        sub: savedUser._id, // sub is short for subject. It is the user id
        username: savedUser.username,
      };

      // Return access token
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      // Throw error if any
      throw new HttpException(error, 500);
    }
  }

  async loginUser(loginUserDto: LoginDto): Promise<{ access_token: string }> {
    try {
      // Find user by username
      const user = await this.userModel.findOne({ username: loginUserDto.username }).exec();

      // Check if user exists
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Check if password is correct by comparing it with the hashed password in the database
      const passwordMatches = await compare(loginUserDto.password, user.password);
      if (!passwordMatches) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Create payload for JWT
      const payload = {
        sub: user._id, // sub is short for subject. It is the user id
        username: user.username,
      };

      // Return access token
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      // Throw error if any
      throw new HttpException(error, 500);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!user) {
        throw new NotFoundException('User not found');
    }
    return (await user).toObject({ versionKey: false, transform: (_, ret) => { delete ret.password; return ret; } });
  }

  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }



}
