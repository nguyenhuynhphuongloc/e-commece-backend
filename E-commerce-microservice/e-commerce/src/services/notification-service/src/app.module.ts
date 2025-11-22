import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    NotificationModule,

    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({

      useFactory: async (configService: ConfigService) => {
        
        const uri = configService.get<string>('MONGODB_URI');

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
