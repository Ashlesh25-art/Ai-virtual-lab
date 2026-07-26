import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/session' })
export class SessionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-session')
  handleJoinSession(@MessageBody() data: { sessionId: string }, @ConnectedSocket() client: Socket) {
    client.join(`session-${data.sessionId}`);
    this.server.to(`session-${data.sessionId}`).emit('student-joined', { clientId: client.id });
  }

  @SubscribeMessage('code-update')
  handleCodeUpdate(
    @MessageBody() data: { sessionId: string; studentId: string; code: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Broadcast code updates to instructors monitoring the session
    client.to(`session-${data.sessionId}`).emit('student-code-update', data);
  }
}