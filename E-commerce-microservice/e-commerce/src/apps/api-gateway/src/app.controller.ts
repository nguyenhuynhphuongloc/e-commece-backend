import { BadRequestException, Body, Controller, Get, Inject, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientGrpc } from '@nestjs/microservices';

@Controller()
export class AppController {
  // Khai báo client gRPC cho từng service
  private userServiceClient: any;
  private AuthServiceClient: any;
  private notificationServiceClient: any;
  private orderServiceClient: any;
  private paymentServiceClient: any;
  private inventoryServiceClient: any;
  private productServiceClient: any

  constructor(
    private readonly appService: AppService,

    // Inject các gRPC Clients đã đăng ký
    @Inject('USER_PACKAGE') private userService: ClientGrpc,
    @Inject('AUTH_PACKAGE') private authService: ClientGrpc,
    @Inject('PAYMENT_PACKAGE') private paymentService: ClientGrpc,
    @Inject('NOTIFICATION_PACKAGE') private notificationClient: ClientGrpc,
    @Inject('ORDER_PACKAGE') private orderClient: ClientGrpc,
    @Inject('INVENTORY_PACKAGE') private inventoryClient: ClientGrpc,
    @Inject('PRODUCT_PACKAGE') private productclient: ClientGrpc
  ) { }

  // Khởi tạo các service client sau khi module khởi chạy
  onModuleInit() {
    this.userServiceClient = this.userService.getService<any>('UserService');
    this.AuthServiceClient = this.authService.getService<any>('AuthService');
    this.paymentServiceClient = this.paymentService.getService<any>('PaymentService');
    this.orderServiceClient = this.orderClient.getService<any>('OrderService');
    this.notificationServiceClient = this.notificationClient.getService<any>('NotificationService');
    this.inventoryServiceClient = this.inventoryClient.getService<any>('InventoryService');
    this.productServiceClient = this.productclient.getService<any>('ProductService');
  }

  // done
  @Get('findUserByEmail')
  async findUserByEmail(@Body() email: string) {
    // Tìm người dùng theo email
    return await this.userServiceClient.findByEmail(email);
  }

  //done
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    // Đăng nhập
    return await this.AuthServiceClient.login(body);
  }

  //done
  @Post('register')
  async register(@Body() body: { name: string; username: string; email: string; password: string }) {
    // Đăng ký tài khoản mới
    return await this.AuthServiceClient.register(body);
  }

  //done
  @Post('logout')
  async Logout(@Body() body: { refreshToken: string }) {
    // Đăng xuất (xóa refresh token)
    if (!body.refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }
    return await this.AuthServiceClient.logout(body);
  }

  //done
  @Post('change-password')
  async changePassword(@Body() body: { userId: string; oldPassword: string; newPassword: string }) {
    // Đổi mật khẩu
    return await this.AuthServiceClient.changePassword(body);
  }

  //fix không cập nhật account type
  @Post('UpdateAccountType')
  async UpdateAccountType(@Body() body: { userId: string; accountType: string }) {
    // Cập nhật loại tài khoản
    return await this.AuthServiceClient.UpdateAccountType(body);
  }

  // done
  @Post('payment/create-customer')
  async createCustomer(@Body() body: { email: string; name?: string }) {
    // Tạo customer trên hệ thống thanh toán (ví dụ: Stripe)
    return await this.paymentServiceClient.CreateCustomer(body);
  }

  //done
  @Post('payment/create-product')
  async createProduct(@Body() body: { name: string; description: string; unitAmount: number; currency: string; interval: string }) {
    // Tạo sản phẩm thanh toán
    return await this.paymentServiceClient.CreateProduct(body);
  }

  // done
  @Post('payment/create-link')
  async createPaymentLink(@Body() body: { orderId: string; items: { productId: string; quantity: number }[] }) {
    // Tạo link thanh toán
    return await this.paymentServiceClient.CreatePaymentLink(body);
  }

  // done
  @Post('notification/send-registration-email')
  async sendRegistrationEmail(@Body() body: { email: string; username: string }) {
    // Gửi email đăng ký
    return await this.notificationServiceClient.SendRegistrationEmail(body);
  }

  //done
  @Post('notification/send-user-notification')
  async sendUserNotification(@Body() body: { userId: string; title: string; content: string; type: string; createdAt: string }) {
    // Gửi thông báo đến người dùng cụ thể
    return await this.notificationServiceClient.SendUserNotification(body);
  }

  // sửa lại order proto :  quantity: number; unitAmount:number,currency:string
  @Post('order/create')
  async createOrder(@Body() body: { userId: string; items: { productId: string; name: string; quantity: number; unitAmount: number, currency: string }[]; note: string }) {
    // Tạo đơn hàng mới
    return await this.orderServiceClient.CreateOrder(body);
  }

  //done
  @Get('Getorder')
  async getOrderById(@Body() body: { orderId: string }) {
    // Lấy đơn hàng theo ID
    return await this.orderServiceClient.GetOrderById(body);
  }

  //done
  @Patch('order/update-status')
  async updateOrderStatus(@Body() body: { orderId: string, newStatus: string }) {
    // Cập nhật trạng thái đơn hàng
    return await this.orderServiceClient.UpdateOrderStatus(body);
  }


  @Get('getuserByID')
  async getOrdersByUserId(@Body() body: { userId: string }) {
    // Lấy tất cả đơn hàng theo userId
    return await this.orderServiceClient.GetOrdersByUserId(body);
  }

  // done
  @Post('inventory/add')
  async addInventory(@Body() body: { productId: string; quantity: number }) {
    // Thêm tồn kho cho sản phẩm
    return await this.inventoryServiceClient.AddInventory(body);
  }

  //done
  @Patch('inventory/update')
  async updateInventory(@Body() body: { productId: string; quantity: number }) {
    // Cập nhật số lượng tồn kho
    return await this.inventoryServiceClient.UpdateInventory(body);
  }

  //done
  @Get('inventory/getInventory')
  async getInventory(@Body() body: { productId: string }) {
    // Lấy tồn kho theo productId
    return await this.inventoryServiceClient.GetInventoryByProductId(body);
  }

  //done
  @Post('inventory/delete')
  async deleteInventory(@Body() body: { productId: string }) {
    // Xóa tồn kho theo productId
    return await this.inventoryServiceClient.DeleteInventory(body);
  }


  //done
  @Post('product/create')
  async createproduct(@Body() body: { name: string; description: string; categoryId: string; price: number; images: string[]; status: string }) {
    // Tạo sản phẩm mới
    return await this.productServiceClient.CreateProduct(body);
  }

  //done
  @Get('product/getProductById')
  async getProductById(@Body() body: { productId: string }) {
    // Lấy sản phẩm theo ID
    return await this.productServiceClient.GetProductById(body);
  }
}

