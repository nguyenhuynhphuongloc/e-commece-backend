import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { Permission } from 'src/auth/schemas/role.schemas';
import { Permissions_Key } from 'src/decorator/permission.decorators';


@Injectable()
export class Authorization implements CanActivate {

    constructor(private reflector: Reflector, private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const request = context.switchToHttp().getRequest();
        const userId = request.user?.id; // 🔥 Lấy userId đúng cách

        if (!userId) {
            throw new UnauthorizedException("User ID not found");
        }

        // 🔥 Lấy permissions gán trên route (nếu có)
        const requiredRoutePermissions: Permission[] =
            this.reflector.getAllAndOverride(Permissions_Key, [context.getHandler(), context.getClass()]) || [];

        if (!requiredRoutePermissions.length) {
            return true; // Nếu route không có quyền yêu cầu, cho phép truy cập
        }

        console.log(`The route permissions are:`, requiredRoutePermissions);

        // 🔥 Lấy user từ AuthService        
        return true;
    }
}
