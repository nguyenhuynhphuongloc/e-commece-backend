import { Controller, Inject } from '@nestjs/common';
import { PaymentService } from './payment.service';
import Stripe from 'stripe';
import { GrpcMethod } from '@nestjs/microservices';



@Controller()
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    @Inject('STRIPE_CLIENT') private readonly stripeSecret: Stripe,
    @Inject('STRIPE_PUBLIC_KEY') private readonly stripePublic: Stripe,
  ) { }

  @GrpcMethod('PaymentService', 'CreateCustomer')
  async createCustomer(data: { email: string; name?: string }) {
    const customer = await this.stripePublic.customers.create({
      email: data.email,
      name: data.name,
    });

    return {
      id: customer.id,
      email: customer.email,
      name: customer.name,
    };
  }

  @GrpcMethod('PaymentService', 'CreateProduct')
  async createProduct(data: {
    name: string;
    description: string;
    unitAmount: number;
    currency: string;
    interval: string;
  }) {
    console.log('Creating product with data:', data);
    const product = await this.stripePublic.products.create({
      name: data.name,
      description: data.description,
      default_price_data: {
        currency: data.currency,
        unit_amount: data.unitAmount,
      },
    });

    return {
      id: product.id,
      name: product.name,
      defaultPriceId:
        typeof product.default_price === 'string'
          ? product.default_price
          : product.default_price?.id || '',
    };
  }

  @GrpcMethod('PaymentService', 'CreatePaymentLink')
  async createPaymentLink(data: {
    orderId: string;
    items: { productId: string; quantity: number }[];
  }) {
    const lineItems: Stripe.PaymentLinkCreateParams.LineItem[] = [];

    for (const item of data.items) {
      const product = await this.stripePublic.products.retrieve(item.productId);
      if (!product.default_price) {
        throw new Error(`Product ${item.productId} has no default price`);
      }

      lineItems.push({
        price: typeof product.default_price === 'string'
          ? product.default_price
          : product.default_price.id,
        quantity: item.quantity,
      });
    }

    const link = await this.stripePublic.paymentLinks.create({
      line_items: lineItems,
      metadata: { orderId: data.orderId },
    });

    return { url: link.url };
  }
}
