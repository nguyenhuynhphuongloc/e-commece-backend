import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @GrpcMethod('OrderService', 'CreateOrder')
  async createOrder(data: { userId: string; items: { productId: string;name:string; quantity: number; unitAmount:number,currency:string }[]; note: string }) {
    return await this.orderService.createOrder(data);
  }

  @GrpcMethod('OrderService', 'GetOrderById')
  async getOrderById(data: { orderId: string }) {
    return await this.orderService.getOrderById(data);
  }

  @GrpcMethod('OrderService', 'UpdateOrderStatus')
  async updateOrderStatus(data: { orderId: string; newStatus: string }) {
    return this.orderService.updateOrderStatus(data);
  }

  @GrpcMethod('OrderService', 'GetOrdersByUserId')
  async getOrdersByUserId(data: { userId: string }) {
    return this.orderService.getOrdersByUserId(data);
  }
}
