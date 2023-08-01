import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Book } from './entities/book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book-dto';

@Controller('books')
export class BooksController {
  constructor(private readonly BooksService: BooksService) {}
  @Get()
  getAll(): Promise<Book[]> {
    return this.BooksService.findAll();
  }

  @Get('/:id')
  getOne(@Param('id') bookId: number): Promise<Book> {
    return this.BooksService.findOne(bookId);
  }

  @Post()
  createBook(@Body() createBookData: CreateBookDto) {
    return this.BooksService.create(createBookData);
  }

  @Delete('/:id')
  deleteBook(@Param('id') bookId: number) {
    return this.BooksService.remove(bookId);
  }

  @Patch('/:id')
  updateBook(@Param('id') bookId: number, @Body() updateData: UpdateBookDto) {
    return this.BooksService.update(bookId, updateData);
  }
}
