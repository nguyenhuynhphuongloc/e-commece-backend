import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [

    AuthModule,
  
    ConfigModule.forRoot({
      isGlobal: true, // 💡 Cho phép dùng ở bất cứ đâu
    }),

    MongooseModule.forRootAsync({

      useFactory: async (configService: ConfigService) => {
        
        const uri = configService.get<string>('MONGODB_URI_AuthService');

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
  controllers: [AppController],
  
  providers: [AppService],
})
export class AppModule {}
