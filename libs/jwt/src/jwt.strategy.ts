import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    private logger = new Logger(JwtStrategy.name)
    constructor(private configService: ConfigService) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("secret_key"),
        });
    }

    async validate(payload: any) {
        this.logger.log(`JwtStrategy payload -> ${JSON.stringify(payload)} `)
        return payload;
    }
}