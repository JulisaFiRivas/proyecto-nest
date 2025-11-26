import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RatingsModule } from './ratings/ratings.module';
import { User } from './users/entities/user.entity';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/entities/book.entity';
import { Rating } from './ratings/entities/rating.entity';
import { Comment } from './comments/entities/comment.entity';
import { ListsModule } from './lists/lists.module';
import { UserBookList } from './lists/entities/user-book-list.entity/user-book-list.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { envValidationSchema } from './config/env.validation';

@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigService esté disponible en todos los módulos
      envFilePath: '.env',
      validationSchema: envValidationSchema, // Valida las variables de entorno al iniciar
    }),

    // Configuración de TypeORM usando ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [Book, Rating, User, Comment, UserBookList],
        synchronize: false,
        logging: false,
      }),
    }),

    BooksModule,
    SeedModule,
    RatingsModule,
    CommentsModule,
    UsersModule,
    ListsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
