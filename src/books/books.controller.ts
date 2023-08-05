import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Book } from './entities/book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book-dto';
import { ConfigService } from '@nestjs/config';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@Controller('books')
export class BooksController {
  constructor(
    private readonly BooksService: BooksService,
    private readonly ConfigService: ConfigService,
  ) {}
  @Get()
  getAll(): Promise<Book[]> {
    return this.BooksService.findAll();
  }

  @Get('/:id')
  getOne(@Param('id') bookId: number): Promise<Book> {
    return this.BooksService.findOne(bookId);
  }

  @Post()
  @UseGuards(AuthorizationGuard)
  createBook(@Body() createBookData: CreateBookDto) {
    return this.BooksService.create(createBookData);
  }

  @Delete('/:id')
  @UseGuards(AuthorizationGuard)
  deleteBook(@Param('id') bookId: number) {
    return this.BooksService.remove(bookId);
  }

  @Patch('/:id')
  @UseGuards(AuthorizationGuard)
  updateBook(@Param('id') bookId: number, @Body() updateData: UpdateBookDto) {
    return this.BooksService.update(bookId, updateData);
  }
}
