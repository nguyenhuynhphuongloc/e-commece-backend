import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @GrpcMethod('PaymentService', 'CreateCustomer')
  async createCustomer(data: { email: string; name?: string }) {
    return this.paymentService.createCustomer(data);
  }

  @GrpcMethod('PaymentService', 'CreateProduct')
  async createProduct(data: {
    name: string;
    description: string;
    unitAmount: number;
    currency: string;
    interval: string;
  }) {
    return this.paymentService.createProduct(data);
  }

  @GrpcMethod('PaymentService', 'CreatePaymentLink')
  async createPaymentLink(data: {
    orderId: string;
    items: { productId: string; quantity: number }[];
  }) {
    return this.paymentService.createPaymentLink(data);
  }
}
