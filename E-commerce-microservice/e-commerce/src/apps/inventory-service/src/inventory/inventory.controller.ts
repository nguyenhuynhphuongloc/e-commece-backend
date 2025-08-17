// inventory.controller.ts
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @GrpcMethod('InventoryService', 'AddInventory')
  async addInventory(data: { productId: string; quantity: number }) {
    return await this.inventoryService.addInventory(data);
  }

  @GrpcMethod('InventoryService', 'UpdateInventory')
  async updateInventory(data: { productId: string; quantity: number }) {
    return this.inventoryService.updateInventory(data);
  }

  @GrpcMethod('InventoryService', 'GetInventoryByProductId')
  async getInventory(data: { productId: string }) {
    return this.inventoryService.getInventoryByProductId(data.productId);
  }

  @GrpcMethod('InventoryService', 'DeleteInventory')
  async deleteInventory(data: { productId: string }) {
    return this.inventoryService.deleteInventory(data.productId);
  }
}
