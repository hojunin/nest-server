import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [BooksController],
  providers: [BooksService, ConfigService],
  imports: [TypeOrmModule.forFeature([Book])],
})
export class BooksModule {}
