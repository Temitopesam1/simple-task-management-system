import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './user.schema';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from './jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { TasksService } from 'src/tasks/tasks.service';
import { Task, TaskSchema } from 'src/tasks/task.schema';
import { TasksGateway } from 'src/tasks/tasks.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Task.name, schema: TaskSchema }
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret, 
      signOptions: { expiresIn: '1h' }
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    TasksGateway,
    TasksService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
