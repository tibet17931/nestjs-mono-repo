import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    SetMetadata,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {

    constructor(private reflector: Reflector) {
        super();
    }

    private logger = new Logger(JwtAuthGuard.name)

    private service_name = "";

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        this.logger.log(`isPublic -> ${JSON.stringify(isPublic)}`);

        const request = context.switchToHttp().getRequest();
        this.service_name = request.url;
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        this.logger.log(`user -> ${JSON.stringify(user)}`);
        this.logger.log(`service_name -> ${this.service_name}`);

        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);