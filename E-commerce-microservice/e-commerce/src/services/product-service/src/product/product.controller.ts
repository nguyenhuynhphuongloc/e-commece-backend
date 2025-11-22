import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  private paymentServiceClient: any;

  constructor(
    private readonly productService: ProductService

  ) { }

  @GrpcMethod('ProductService', 'CreateProduct')
  async createProduct(data: {
    name: string;
    description: string;
    categoryId: string;
    price: number;
    images: string[];
    status: string;
  }) {
    return await this.productService.createProduct(data);
  }

  @GrpcMethod('ProductService', 'GetProductById')
  async getProductById(data: { productId: string }) {
    return this.productService.getProductById(data.productId);
  }

  @GrpcMethod('ProductService', 'GetProductsByCategory')
  async getProductsByCategory(data: {
    categoryId: string;
    page: number;
    limit: number;
  }) {
    return this.productService.getProductsByCategory(data);
  }

  @GrpcMethod('ProductService', 'UpdateProduct')
  async updateProduct(data: {
    productId: string;
    name: string;
    description: string;
    categoryId: string;
    price: number;
    images: string[];
    status: string;
  }) {
    return this.productService.updateProduct(data);
  }

  @GrpcMethod('ProductService', 'DeleteProduct')
  async deleteProduct(data: { productId: string }) {
    return this.productService.deleteProduct(data.productId);
  }
}
