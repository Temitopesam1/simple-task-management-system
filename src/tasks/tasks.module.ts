// tasks/tasks.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task, TaskSchema } from './task.schema';
import { TasksGateway } from './tasks.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksGateway],
  exports: [TasksService]
})
export class TasksModule {}
