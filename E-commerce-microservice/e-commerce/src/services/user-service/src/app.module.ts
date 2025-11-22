import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    forwardRef(() => UserModule),
    
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({

      useFactory: async (configService: ConfigService) => { 
        
        const uri = configService.get<string>('MONGODB_URI_Service');

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
