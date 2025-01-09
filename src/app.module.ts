import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { IsConnectedGuard } from './common/guards/is-connected.guard';
import { config } from './config/config';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import { UserAccountModule } from './modules/user_account/user_account.module';
import { VeterinarianModule } from './modules/veterinarian/veterinarian.module';
import { AnimalModule } from './modules/animal/animal.module';
import { DocumentModule } from './modules/document/document.module';
import { SpecieModule } from './modules/specie/specie.module';
import { RaceModule } from './modules/race/race.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    CacheModule.register({
      ttl: 5, // Le temps de vie en secondes
      max: 100, // Nombre maximum d'éléments en cache
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.databaseName'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: false,
        };
      },
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
          algorithm: configService.get<string>('jwt.algorithm') as 'HS256' | 'HS384' | 'HS512' | 'RS256',
        },
      }),
      inject: [ConfigService],
    }),
    CommonModule,
    AuthModule,
    UserAccountModule,
    ClientModule,
    AdminModule,
    VeterinarianModule,
    AnimalModule,
    DocumentModule,
    SpecieModule,
    RaceModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: IsConnectedGuard,
    },
  ],
})
export class AppModule {}
