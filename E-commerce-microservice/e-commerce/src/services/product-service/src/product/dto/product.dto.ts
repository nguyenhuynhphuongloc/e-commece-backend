import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  internalId?: string;

  @IsString()
  productId: string; // từ Stripe

  @IsOptional()
  @IsString()
  defaultPriceId?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsNumber()
  unitAmount?: number;

  @IsOptional()
  @IsString()
  interval?: string; // month | year nếu là subscription
}
export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  internalId?: string;

  @IsOptional()
  @IsString()
  productId?: string; // từ Stripe

  @IsOptional()
  @IsString()
  defaultPriceId?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsNumber()
  unitAmount?: number;

  @IsOptional()
  @IsString()
  interval?: string; // month | year nếu là subscription
}