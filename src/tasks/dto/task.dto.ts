// tasks/dto/task.dto.ts

import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateTaskDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  userId: mongoose.Schema.Types.ObjectId;

}
  
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
  