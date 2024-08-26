import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AzureAdStrategy } from './azure-ad.strategy';

@Module({
    imports: [PassportModule],
    providers: [AzureAdStrategy],
})
export class AuthModule {}
