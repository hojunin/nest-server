import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Book } from './entities/book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book-dto';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
@Controller('books')
export class BooksController {
  constructor(
    private readonly BooksService: BooksService,

    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
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
    this.logger.info(JSON.stringify(createBookData));
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
