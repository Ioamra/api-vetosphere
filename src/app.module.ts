import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { IsConnectedGuard } from './common/guards/is-connected.guard';
import { config } from './config/config';
import { AddressModule } from './modules/address/address.module';
import { AdminModule } from './modules/admin/admin.module';
import { AnimalModule } from './modules/animal/animal.module';
import { AnimalHistoryModule } from './modules/animal_history/animal_history.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { BlogMessageModule } from './modules/blog_message/blog_message.module';
import { CartModule } from './modules/cart/cart.module';
import { CartHasProductModule } from './modules/cart_has_product/cart_has_product.module';
import { CategoryModule } from './modules/category/category.module';
import { ClientModule } from './modules/client/client.module';
import { DeliveryStageModule } from './modules/delivery_stage/delivery_stage.module';
import { DocumentModule } from './modules/document/document.module';
import { EventModule } from './modules/event/event.module';
import { EventTypeModule } from './modules/event_type/event_type.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { NoteModule } from './modules/note/note.module';
import { PhotoModule } from './modules/photo/photo.module';
import { ProductModule } from './modules/product/product.module';
import { RaceModule } from './modules/race/race.module';
import { SpecieModule } from './modules/specie/specie.module';
import { UserAccountModule } from './modules/user_account/user_account.module';
import { VaccinationModule } from './modules/vaccination/vaccination.module';
import { VaccineModule } from './modules/vaccine/vaccine.module';
import { VeterinarianModule } from './modules/veterinarian/veterinarian.module';
import { WorkingSectionModule } from './modules/working_section/working_section.module';

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
    VaccineModule,
    VaccinationModule,
    EventTypeModule,
    EventModule,
    AnimalHistoryModule,
    WorkingSectionModule,
    BlogModule,
    BlogMessageModule,
    AddressModule,
    ProductModule,
    CategoryModule,
    PhotoModule,
    CartModule,
    DeliveryStageModule,
    CartHasProductModule,
    FavoriteModule,
    NoteModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: IsConnectedGuard,
    },
  ],
})
export class AppModule {}
