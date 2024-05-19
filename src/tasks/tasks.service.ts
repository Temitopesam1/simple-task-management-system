// tasks/tasks.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { TasksGateway } from './tasks.gateway';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  private readonly tasksGateway: TasksGateway
  ) {}

  async findAll(page: number = 1, pageSize: number = 10): Promise<Task[]> {
    const skip = (page - 1) * pageSize;
    return this.taskModel.find().skip(skip).limit(pageSize).exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    const task = createdTask.save();
    this.tasksGateway.server.emit('taskCreated', (await task).toObject());
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    this.tasksGateway.server.emit('taskUpdated', (await task).toObject());
    return task;
  }

  async delete(id: string): Promise<Task> {
    const task = this.taskModel.findByIdAndDelete(id).exec();
    this.tasksGateway.server.emit('taskDeleted', (await task).toObject());
    return task;
  }
}
