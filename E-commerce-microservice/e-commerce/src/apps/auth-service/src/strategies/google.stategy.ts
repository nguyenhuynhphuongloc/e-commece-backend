import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import googleOuth from "src/auth/config/google.outh";
import { Strategy } from "passport-google-oauth20";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(
        @Inject('googleOauth') private readonly googleConfig: ConfigType<typeof googleOuth>
    ) {
        super({
        clientID: googleConfig.clientId,
        clientSecret: googleConfig.clientSecret,
        callbackURL: googleConfig.callbackUrl,
        scope: ['email', 'profile'],
        });
    }
    
    async validate(accessToken: string, refreshToken: string, profile: any) {
        const { name, emails } = profile;
        return {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        accessToken,
        };
    }
    }