import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MailService } from 'mail/mail.service';
import { Model } from 'mongoose';

import { Notification } from 'src/notification/schemas/notification.schemal';
@Injectable()
export class NotificationService {

    constructor(
        private readonly mailService: MailService,
        @InjectModel(Notification.name)
        private readonly notificationModel: Model<Notification>,

    ) {}

  async sendRegistrationEmail(data: { email: string; username: string }) {
    console.log(' Sending registration email to:', data.email);

    await this.mailService.sendRegistrationEmail(data);
   
    return { success: true, message: 'Registration email sent successfully' };
  }

 

  async sendUserNotification(data: {
    userId: string;
    title: string;
    content: string;
    type: string;
    createdAt: string;
  }) {

    console.log(' Sending user notification:', data);

     // 📝 Lưu thông báo vào MongoDB
    await this.notificationModel.create({
    userId: data.userId,
    title: data.title,
    content: data.content,
    type: data.type,
    createdAt: new Date(data.createdAt), // Chuyển string thành Date
  });
    // TODO: Lưu thông báo vào DB hoặc push real-time
    return { success: true, message: 'User notification sent successfully' };
  }

  async sendGlobalNotification(data: {
    title: string;
    content: string;
    type: string;
    createdAt: string;
  }) {
    await this.notificationModel.create({
        userId: null, // dấu hiệu là thông báo toàn hệ thống
        title: data.title,
        content: data.content,
        type: data.type,
        createdAt: data.createdAt,
      });

   

    return {
      success: true,
      message: 'Global notification sent',
    };
  }
}
