import { Module } from '@nestjs/common';

import { InventoryModule } from './inventory/inventory.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    InventoryModule,

    ConfigModule.forRoot({
      isGlobal: true, // 💡 Cho phép dùng ở bất cứ đâu
    }),

    MongooseModule.forRootAsync({

      useFactory: async (configService: ConfigService) => {

        const uri = configService.get<string>('MONGODB_URI_InventoryService');

        if (!uri) {
          throw new Error('MongoDB connection string (MONGODB_URL) is not defined in the .env file');
        }

        console.log('MongoDB URI:', uri);

        return {
          uri,
          authSource: 'admin', // Ensure MongoDB authenticates correctly
        };
      },

      inject: [ConfigService],
    }),

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
