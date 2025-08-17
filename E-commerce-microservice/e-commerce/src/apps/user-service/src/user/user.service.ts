import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Users } from 'src/user/schemas/user.schemas';
import { hassPassword } from 'src/helpers/util';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>
  ) {}

  async CheckEmailExist(email: string) {
    
    const user = await this.userModel.exists({ email });

    return user ? true : false;
  }

  async create(createUserDto: CreateUserDto) {
    // 1. Kiểm tra password
    if (!createUserDto.password) {
      throw new BadRequestException('Password is required');
    }
  
    // 2. Băm mật khẩu
    const hashedPassword = await hassPassword(createUserDto.password);
    
    if (!hashedPassword) {
      throw new BadRequestException('Failed to hash password');
    }
  
    // 3. Chuẩn bị dữ liệu
    const userData = {
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
      role: createUserDto.role ?? 'client',
      account_type: createUserDto.account_type ?? 'basic',
      name: createUserDto.name ?? '',
    };
  
    // 4. Lưu vào DB
    const createdUser = new this.userModel(userData);
    
    const savedUser = await createdUser.save();
  
    console.log('✅ User created successfully:', savedUser);
  
    // 5. Trả về dữ liệu cho auth_service
    return {
      id: savedUser._id.toString(),
      username: savedUser.username,
      email: savedUser.email,
      role: savedUser.role,
      account_type: savedUser.account_type || "dsad",
      name: savedUser.get('name') || "dsadsa",
    };
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async UpdatePassword(data: { userId: string; hashedPassword: string }) {

    const user = await this.userModel.findByIdAndUpdate(
      data.userId,
      { password: data.hashedPassword },
      { new: true } // Trả về bản ghi mới sau khi update
    );
  
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
  
    return {
      userId: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role
    };
  }

  async findById(id: string) {
    return await this.userModel.findById(id); // ✅ Mongoose sẽ tự hiểu đó là _id
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async DeleteUser(id: string) {
    console.log("User deleted successfully");
    return this.userModel.findByIdAndDelete(id);
  }

// user.service.ts
async updateRole(userId: string, accountType: string) {

  const objectId = new Types.ObjectId(userId);

  const updatedUser = await this.userModel.findByIdAndUpdate(
    objectId,
    { $set: { account_type: accountType } },
    { new: true }
  );

  if (!updatedUser) {
    return { success: false, message: 'User not found' };
  }


  return {
    success: true,
    message: 'Account type updated successfully',
    updated: updatedUser.account_type, // log để kiểm chứng
  };
}

}