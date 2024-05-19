// tasks/tasks.gateway.ts

import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';

  @WebSocketGateway({
    cors: {
      origin: '*', // Allow all origins
      methods: ['GET', 'POST'],
      credentials: true,
    },
  })
  
  @WebSocketGateway()
  export class TasksGateway {
    @WebSocketServer()
    server: Server;
  
    @SubscribeMessage('createTask')
    handleCreateTask(@MessageBody() task: any) {
      this.server.emit('taskCreated', task);
    }
  
    @SubscribeMessage('updateTask')
    handleUpdateTask(@MessageBody() task: any) {
      this.server.emit('taskUpdated', task);
    }
  
    @SubscribeMessage('deleteTask')
    handleDeleteTask(@MessageBody() task: any) {
      this.server.emit('taskDeleted', task);
    }
  }
  