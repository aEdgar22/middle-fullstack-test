import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: any) {
    console.log(`⚡ Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`❌ Cliente desconectado: ${client.id}`);
  }

  sendStockAlert(notification: { productId: string; cantidadRestante: number }) {
    this.server.emit('stock-alert', notification);
  }
}
