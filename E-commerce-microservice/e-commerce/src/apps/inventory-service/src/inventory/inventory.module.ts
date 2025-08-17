import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InventorySchema } from 'src/schemas/inventory.schemas';

@Module({
  imports: [
    // Import MongooseModule and the Inventory schema
    MongooseModule.forFeature([
      { name: 'Inventory', schema: InventorySchema },
    ]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
