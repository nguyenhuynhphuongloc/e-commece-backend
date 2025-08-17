import { Injectable } from '@nestjs/common';
import { CreateBlacklistDto } from './dto/create-blacklist.dto';
import { UpdateBlacklistDto } from './dto/update-blacklist.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Blacklist } from 'src/auth/schemas/Blacklist.schemas';

@Injectable()
export class BlacklistService {
  constructor(@InjectModel(Blacklist.name) private blacklistModel: Model<Blacklist>) { }
  


  async create(createBlacklistDto: CreateBlacklistDto) {
    return this.blacklistModel.create(createBlacklistDto);
  }

  findAll() {
    return `This action returns all blacklist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blacklist`;
  }

  update(id: number, updateBlacklistDto: UpdateBlacklistDto) {
    return `This action updates a #${id} blacklist`;
  }

async remove(id: string) {
    
  return this.blacklistModel.findByIdAndDelete(id)

}

async FindAccesstoken(accessToken:string){
  return this.blacklistModel.findOne({
    where: { accessToken }, // Tìm bản ghi có accessToken giống với giá trị truyền vào
  });
}
}
