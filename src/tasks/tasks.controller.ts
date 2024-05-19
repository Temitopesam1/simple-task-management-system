// tasks/tasks.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request, Query } from '@nestjs/common';
import { IsMineGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { Task } from './task.schema';


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<Task[]> {
    return this.tasksService.findAll(page, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req): Promise<Task> {
    createTaskDto.userId = req.user.sub;
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  @UseGuards(IsMineGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(IsMineGuard)
  async delete(@Param('id') id: string): Promise<any> {
    this.tasksService.delete(id);
    return "Task Deleted Successfully!"
  }
}
