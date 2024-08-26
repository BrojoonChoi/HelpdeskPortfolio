// src/auth/azure-ad.strategy.ts
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AzureAdStrategy extends PassportStrategy(BearerStrategy) {
    constructor() {
        super({
            identityMetadata: `https://login.microsoftonline.com/${process.env.MS_SSO_TENANT_ID}/v2.0/.well-known/openid-configuration`,
            clientID: process.env.MS_SSO_CLIENT_ID,
            validateIssuer: false,
            loggingLevel: 'info',
            passReqToCallback: false,
            loggingNoPII: true,  
            issuer: `https://sts.windows.net/${process.env.MS_SSO_TENANT_ID}/`,
        });
    }

    async validate(payload: any) {
        return { ...payload };
    }
}