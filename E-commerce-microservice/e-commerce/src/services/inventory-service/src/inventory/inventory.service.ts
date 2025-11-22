import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from 'src/schemas/inventory.schemas';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
  ) {}

  async addInventory(data: { productId: string; quantity: number }) {
    const { productId, quantity } = data;

    const existing = await this.inventoryModel.findOne({ productId });

    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return { productId, quantity: existing.quantity };
    }

    const created = await this.inventoryModel.create({
      productId,
      quantity,
    });

    return { productId: created.productId, quantity: created.quantity };
  }

  async updateInventory(data: { productId: string; quantity: number }) {
    const updated = await this.inventoryModel.findOneAndUpdate(
      { productId: data.productId },
      { quantity: data.quantity },
      { new: true, upsert: true },
    );

    return { productId: updated.productId, quantity: updated.quantity };
  }

  async getInventoryByProductId(productId: string) {
    const found = await this.inventoryModel.findOne({ productId });

    return {
      productId,
      quantity: found ? found.quantity : 0,
    };
  }

  async deleteInventory(productId: string) {
    return await this.inventoryModel.deleteOne({ productId });
  }
}
