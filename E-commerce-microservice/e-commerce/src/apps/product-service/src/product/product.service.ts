import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { Product, ProductDocument } from 'src/schemas/prodcut.schemas';


interface CreatedPaymentProduct {
  id: string;
  name: string;
  defaultPriceId: string;
}

@Injectable()
export class ProductService {
  private paymentServiceClient: any;
  private inventoryServiceClient: any;

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @Inject('PAYMENT_PACKAGE') private paymentService: ClientGrpc,
    @Inject('INVENTORY_PACKAGE') private inventoryClient: ClientGrpc,
  ) { }

  onModuleInit() {
    this.paymentServiceClient = this.paymentService.getService<any>('PaymentService');
    this.inventoryServiceClient = this.inventoryClient.getService<any>('InventoryService');
  }

  async createProduct(data: {
    name: string;
    description: string;
    categoryId: string;
    price: number;
    images: string[];
    status: string;
  }) {

    const created_product: CreatedPaymentProduct = await firstValueFrom(
      this.paymentServiceClient.createProduct({
        name: data.name,
        description: data.description,
        unitAmount: data.price,
        currency: 'usd',
        interval: 'month',
      }),
    );

    console.log('Created product from payment service:', created_product);

    await firstValueFrom(
      this.inventoryServiceClient.addInventory({
        productId: created_product.id,
        quantity: 0,
      }),
    );

    const newProduct = new this.productModel({
      name: data.name,
      description: data.description,
      category: data.categoryId,
      images: data.images || [],
      active: data.status === 'active',
      currency: 'usd',
      unitAmount: data.price,
      productId: created_product.id,
      defaultPriceId: created_product.defaultPriceId, // hoặc bạn tự gán nếu muốn tạo riêng
    });

    const saved = await newProduct.save();
    return this.formatProduct(saved);
  }

  async getProductById(productId: string) {
    const product = await this.productModel.findOne({ productId });
    if (!product) throw new NotFoundException('Product not found');
    return this.formatProduct(product);
  }

  async getProductsByCategory(data: {
    categoryId: string;
    page: number;
    limit: number;
  }) {
    const skip = (data.page - 1) * data.limit;
    const products = await this.productModel
      .find({ category: data.categoryId })
      .skip(skip)
      .limit(data.limit)
      .exec();

    return {
      products: products.map((p) => this.formatProduct(p)),
    };
  }

  async updateProduct(data: {
    productId: string;
    name: string;
    description: string;
    categoryId: string;
    price: number;
    images: string[];
    status: string;
  }) {
    const updated = await this.productModel.findOneAndUpdate(
      { productId: data.productId },
      {
        name: data.name,
        description: data.description,
        category: data.categoryId,
        images: data.images || [],
        active: data.status === 'active',
        unitAmount: data.price,
      },
      { new: true },
    );

    if (!updated) throw new NotFoundException('Product not found');
    return this.formatProduct(updated);
  }

  async deleteProduct(productId: string) {
    const deleted = await this.productModel.findOneAndDelete({ productId });
    if (!deleted) throw new NotFoundException('Product not found');
    return { message: `Product ${productId} deleted successfully.` };
  }

  private formatProduct(product: ProductDocument) {
    return {
      productId: product.productId,
      name: product.name,
      description: product.description,
      categoryId: product.category,
      price: product.unitAmount,
      images: product.images || [],
      status: product.active ? 'active' : 'inactive'
    };
  }
}
