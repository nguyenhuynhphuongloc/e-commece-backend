import { Controller, Get, UseGuards } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { GrpcMethod } from '@nestjs/microservices/decorators';
import { AuthService } from 'src/auth/auth.service';
import { GoogleGuard } from 'src/auth/guards/google.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // 🟢 LOGIN
  @GrpcMethod('AuthService', 'Login')
  async loginUser(data: {
    email: string;       // Email đăng nhập
    password: string;    // Mật khẩu
  }) {
    return await this.authService.login(data);
  }

  // 🟢 REGISTER
  @GrpcMethod('AuthService', 'Register')
  async register(data: {
    name: string;        // Tên đầy đủ người dùng
    username: string;    // Tên người dùng (không trùng)
    email: string;       // Email người dùng
    password: string;    // Mật khẩu
  }) {
    return await this.authService.register(data);
  }

  // 🟢 LOGOUT
  @GrpcMethod('AuthService', 'Logout')
  async logout(body: {
    refreshToken: string;  // Refresh token cần blacklist
  }) {
    try {
      console.log('🟡 gRPC Logout input:', body);
      return await this.authService.logout(body);
    } catch (error) {
      console.error('🔴 Logout gRPC error:', error);
      throw new RpcException({ message: 'Logout failed', status: 400 });
    }
  }

  // 🟢 REFRESH TOKEN
  @GrpcMethod('AuthService', 'RefreshToken')
  async refreshToken(data: {
    refresh_token: string;  // Refresh token hợp lệ để tạo access token mới
  }) {
    try {
      if (!data.refresh_token


      ) {
        throw new Error('Refresh token is missing');
      }
      return await this.authService.refreshToken(data);
    } catch (error) {
      console.error('🔴 RefreshToken gRPC error:', error);
      throw new RpcException({ message: 'Refresh token failed', status: 400 });
    }
  }

  // 🟢 CHANGE PASSWORD
  @GrpcMethod('AuthService', 'ChangePassword')
  async changePassword(body: {
    userId: string;        // ID người dùng muốn đổi mật khẩu
    oldPassword: string;   // Mật khẩu cũ
    newPassword: string;   // Mật khẩu mới
  }) {
    try {
      console.log('🟡 ChangePassword input:', body);
      return await this.authService.changePassword(body);
    } catch (error) {
      console.error('🔴 ChangePassword gRPC error:', error);
      throw new RpcException({ message: 'Change password failed', status: 400 });
    }
  }

  // 🟢 UPDATE ACCOUNT TYPE
  @GrpcMethod('AuthService', 'UpdateAccountType')
  async updateAccountType(body: {
    userId: string;         // ID người dùng
    accountType: string;    // Loại tài khoản muốn cập nhật: basic | medium | vip
  }) {
    try {
      console.log('🟡 UpdateAccountType input:', body);
      return await this.authService.updateAccountType(body);
    } catch (error) {
      console.error('🔴 UpdateAccountType gRPC error:', error);
      throw new RpcException({ message: 'Update account type failed', status: 400 });
    }
  }

  @Get('google/login')
  @UseGuards(GoogleGuard)
  GoogleLogin() {
    return { status: 'Auth service is running' };
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  GoogleCallback() {
    return { status: 'Google authentication successful' };
  }
}
