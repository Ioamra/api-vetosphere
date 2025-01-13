import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '../admin/admin.module';
import { ClientModule } from '../client/client.module';
import { VeterinarianModule } from '../veterinarian/veterinarian.module';
import { UserAccount } from './entities/user_account.entity';
import { UserAccountController } from './user_account.controller';
import { UserAccountService } from './user_account.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccount]), JwtModule, AdminModule, VeterinarianModule, ClientModule],
  controllers: [UserAccountController],
  providers: [UserAccountService],
  exports: [UserAccountService],
})
export class UserAccountModule {}
