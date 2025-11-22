import { IsString, IsInt, Min } from 'class-validator';

export class UpdateInventoryDto {
  @IsString()
  productId: string;

  @IsInt()
  @Min(0)
  quantity: number;
}
export class CreateInventoryDto {
  @IsString()
  productId: string;
  
  @IsInt()
  @Min(0)
  quantity: number;
}