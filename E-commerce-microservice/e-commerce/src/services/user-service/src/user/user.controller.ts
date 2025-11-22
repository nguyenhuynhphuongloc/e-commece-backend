import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @GrpcMethod('UserService', 'FindByEmail')
  async findByEmail(data: { email: string }) {

    const user = await this.userService.findByEmail(data.email);

    if (!user) throw new RpcException({ code: 5, message: 'User not found' });

    return {
      user_id: user._id.toString(),
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    };
  }

  @GrpcMethod('UserService', 'FindById')
  async FindById(data) {

    console.log(data)

    const user = await this.userService.findById(data.userId)

    console.log(user)

    const foundUser = Array.isArray(user) ? user[0] : user;

    if (!foundUser) {
      throw new RpcException('User not found');
    }

    return {
      userId: foundUser._id.toString(),
      username: foundUser.username,
      email: foundUser.email,
      password: foundUser.password,
      role: foundUser.role
    };

  }

  @GrpcMethod('UserService', 'CreateUser')
  async create(data) {
    console.log(data)
    return await this.userService.create(data);
  }

  @GrpcMethod('UserService', 'UpdatePassword')
  async UpdatePassword(data: { userId: string, hashedPassword: string }) {
    console.log(data)
    return await this.userService.UpdatePassword(data);
  }


  @GrpcMethod('UserService', 'DeleteUser')
  async delete(data: { user_id: string }) {
    const deleted = await this.userService.DeleteUser(data.user_id);
    if (!deleted) throw new RpcException({ code: 5, message: 'User not found' });

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }

  @GrpcMethod('UserService', 'UpdateRole')
  async updateRole(data: { userId: string; newRole: string }) {

    const updated = await this.userService.updateRole(data.userId, data.newRole);

    if (!updated) {
      return { success: false, message: 'Failed to update role or user not found' };
    }

    return {
      success: true,
      message: 'Role updated successfully',
    };
  }

 
}
