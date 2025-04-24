import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Comment } from './common/entities/comment.entity';
import { Post } from './common/entities/post.entity';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', '6hD/8k3*M1lP'),
        database: configService.get('DB_DATABASE', 'blog'),
        entities: [Post, Comment],
        synchronize: configService.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    PostModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
