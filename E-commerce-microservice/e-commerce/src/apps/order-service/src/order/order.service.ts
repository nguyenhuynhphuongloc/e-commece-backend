// order.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schemas';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order.name)
    private readonly OrderModel: Model<Order>,

  ) { }

  async createOrder(data: any) {

    await this.OrderModel.create({
      userId: data.userId,
      items: data.items,
      note: data.note,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    return {
      orderId: 'generated_id',
      userId: data.userId,
      items: data.items,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
  }

  async getOrderById(data: { orderId: string }) {

    console.log(data.orderId);

    const order = await this.OrderModel.findById(data.orderId).lean();

    if (!order) {
      throw new Error(`Không tìm thấy đơn hàng với ID: ${data.orderId}`);
    }

    return {
      orderId: order._id.toString(),
      userId: order.userId,
      items: order.items,
      status: order.status,
      note: order.note,
      createdAt: order.createdAt,
    };
  }

  async updateOrderStatus(data: { orderId: string; newStatus: string }) {

    const updatedOrder = await this.OrderModel.findByIdAndUpdate(
      data.orderId,
      { status: data.newStatus },
      { new: true } // để trả về document sau khi cập nhật
    ).lean();

    if (!updatedOrder) {
      throw new Error(`Không tìm thấy đơn hàng với ID: ${data.orderId}`);
    }

    return {
      orderId: updatedOrder._id.toString(),
      userId: updatedOrder.userId,
      items: updatedOrder.items,
      status: updatedOrder.status,
      note: updatedOrder.note,
      createdAt: updatedOrder.createdAt,
    };
  }

  async getOrdersByUserId(data: { userId: string }) {
    // Trả về danh sách đơn hàng theo user
    return {
      orders: [
        {
          orderId: 'order1',
          userId: data.userId,
          items: [],
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
        {
          orderId: 'order2',
          userId: data.userId,
          items: [],
          status: 'paid',
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }
}
