import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    OrderModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    MongooseModule.forRootAsync({

      useFactory: async (configService: ConfigService) => {

        const uri = configService.get<string>('MONGODB_URI_OrderService');

        if (!uri) {
          throw new Error('MongoDB connection string (MONGODB_URL) is not defined in the .env file');
        }

        console.log('MongoDB URI:', uri);

        return {
          uri,
          authSource: 'admin', 
        };
      },

      inject: [ConfigService],
    }),

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
