import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('STRIPE_CLIENT') private readonly stripeSecret: Stripe,
    @Inject('STRIPE_PUBLIC_KEY') private readonly stripePublic: Stripe,
  ) {}

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

  async createProduct(data: {
    name: string;
    description: string;
    unitAmount: number;
    currency: string;
    interval: string;
  }) {
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
        price:
          typeof product.default_price === 'string'
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
