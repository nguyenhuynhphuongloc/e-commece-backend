import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @GrpcMethod('NotificationService', 'SendRegistrationEmail')
  async sendRegistrationEmail(data: { email: string; username: string }) {
    console.log('Sending registration email to:');
    return await this.notificationService.sendRegistrationEmail(data);
  }


  @GrpcMethod('NotificationService', 'SendUserNotification')
  async sendUserNotification(data: {
    userId: string;
    title: string;
    content: string;
    type: string;
    createdAt: string;
  }) {
    return await this.notificationService.sendUserNotification(data);
  }
}
