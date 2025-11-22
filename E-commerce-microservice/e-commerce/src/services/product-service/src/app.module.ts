import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    MongooseModule.forRootAsync({

      useFactory: async (configService: ConfigService) => {
        
        const uri = configService.get<string>('MONGODB_URI_ProdcutService');

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
export class AppModule {}
