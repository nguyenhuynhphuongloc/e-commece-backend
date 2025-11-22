import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blacklist } from './schemas/Blacklist.schemas';
import { comparePassword, hassPassword } from 'src/helpers/util';
import { firstValueFrom, lastValueFrom } from 'rxjs';



@Injectable()
export class AuthService {
  private userServiceClient: any;
  private notificationServiceClient: any;

  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Blacklist.name) private blacklistModel: Model<Blacklist>,
    @Inject('USER_PACKAGE') private userService: ClientGrpc,
    @Inject('NOTIFICATION_PACKAGE') private notificationClient: ClientGrpc,
  ) { }

  onModuleInit() {
    this.userServiceClient = this.userService.getService<any>('UserService');
    this.notificationServiceClient = this.notificationClient.getService<any>('NotificationService');
  }

  async login(data) {
    // Gọi user_service để xác thực
    const user = await lastValueFrom(this.userServiceClient.findByEmail({ email: data.email })) as any;

    console.log('User from userService:', user);


    if (!user) {
      throw new UnauthorizedException('Invalid email is not exist');
    }

    console.log(user.password, data.password)

    const checkPassword = await comparePassword(data.password, user.password); // ✅ đúng


    if (!checkPassword) {
      throw new UnauthorizedException("password is correct")
    }


    const payload = { sub: user.id, email: user.email, role: user.role };



    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });



    return { accessToken: accessToken, refreshToken: refreshToken, user };
  }

  async register(data: { name: string; username: string; email: string; password: string }) {

    console.log('Registering user with data:', data);



    const createdUserObservable = this.userServiceClient.CreateUser({
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      role: 'client',
    });

    const response: any = await firstValueFrom(createdUserObservable); // ✅ chuyển từ Observable sang Promise

    const createdUser = response && response.user ? response.user : response; // Adjust according to actual gRPC response structure


    if (!createdUser) {
      throw new RpcException('User creation failed');
    }

    // Tạo access token (JWT)
    const payload = {
      sub: createdUser.user_id,
      email: createdUser.email,
      role: createdUser.role,
    };

    const token = this.jwtService.sign(payload);

    console.log('token;', token);


    const result = firstValueFrom(
      this.notificationServiceClient.sendRegistrationEmail({
        email: data.email,
        username: data.username,
      })
    );

    console.log('✅ Email response from gRPC:', result);

    return {
      accessToken: token,
      refreshToken: 'dummy_refresh_token',
      user_id: createdUser.user_id,
      email: createdUser.email,
      name: createdUser.name,
      username: createdUser.username,
      role: createdUser.role,
      account_type: createdUser.account_type || 'basic',
    };
  }

  async logout(data) {
    try {

      await this.blacklistModel.create({ refresh_token: data.refreshToken });

      return { success: true, message: 'Logged out successfully' };
    } catch (err) {
      console.error('Logout error:', err);
      throw err; // hoặc: throw new InternalServerErrorException('Logout failed');
    }
  }

  async refreshToken(data: { refresh_token: string }) {
    const { refresh_token } = data;

    // Kiểm tra token đã bị logout chưa
    const blacklisted = await this.blacklistModel.findOne({ refresh_token }).exec();
    if (blacklisted) {
      throw new UnauthorizedException('Token is blacklisted');
    }

    let payload: any;

    try {
      payload = this.jwtService.verify(refresh_token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const newAccessToken = this.jwtService.sign(
      { sub: payload.sub, email: payload.email, role: payload.role },
      { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' }
    );

    return {
      access_token: newAccessToken,
    };
  }

  async changePassword(data) {

    const user = await lastValueFrom(this.userServiceClient.FindById({ userId: data.userId })) as any;

    if (!user) {
      throw new UnauthorizedException('Invalid email is not exist');
    }

    const checkPassword = await comparePassword(data.oldPassword, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException("password is correct")
    }

    const hashedPassword = await hassPassword(data.newPassword)

    await lastValueFrom(
      this.userServiceClient.UpdatePassword({
        userId: data.userId,
        hashedPassword: hashedPassword
      })
    );


    return {
      success: true,
      message: 'Password changed successfully'
    };
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const exists = await this.blacklistModel.findOne({ token }).exec();
    return !exists;
  }

  async updateAccountType(body: {
    userId: string,         // ID người dùng
    accountType: string;    // Loại tài khoản muốn cập nhật: basic | medium | vip
  }
  ) {

    const user = await lastValueFrom(this.userServiceClient.FindById({ userId: body.userId })) as any;

    if (!user) {
      throw new UnauthorizedException('Invalid email is not exist');
    }

    await this.userServiceClient.updateRole({
      userId: body.userId,
      accountType: body.accountType
    });

    return {
      success: true,
      message: 'Account type updated successfully',
    };
  }


}


