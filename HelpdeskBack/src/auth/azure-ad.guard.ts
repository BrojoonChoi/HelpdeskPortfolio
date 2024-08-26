import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class AzureAdGuard extends AuthGuard('oauth-bearer') implements CanActivate {
  //constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (process.env.GUARD_FREE.toString() == "true")
      return true;

    if (token) {
      const decodedToken = jwt.decode(token) as any;
      if (decodedToken && decodedToken.exp) {
        /*
        const expTime = new Date(decodedToken.exp * 1000);
        const serverTime = new Date();
        
        console.log(`Token expires at: ${expTime}`);
        console.log(`Token expires at: ${expTime.toISOString()}`);
        console.log(`Server time: ${serverTime.toISOString()}`);
        */

        if (decodedToken.tenant_id == process.env.MS_SSO_TENANT_ID)
        {
          console.log("true")
        }
      }
    }
    
    return super.canActivate(context);
  }

  private extractTokenFromHeader(request: any): string | null {
    const authorization = request.headers.authorization;
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.split(' ')[1];
    }
    return null;
  }
}
