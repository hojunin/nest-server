import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book-dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBookDto } from './dto/update-book-dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    try {
      const target = this.bookRepository.findOneBy({ id });
      if (!target) {
        throw new NotFoundException(`Book with ID : ${id}`);
      }

      return target;
    } catch (error) {}
  }

  async create(createBookData: CreateBookDto): Promise<Book> {
    try {
      return await this.bookRepository.save(createBookData);
    } catch (error) {}
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.bookRepository.delete(id);
  }

  async update(id: number, updateData: UpdateBookDto): Promise<Book> {
    const target = await this.findOne(id);

    return await this.bookRepository.save({ ...target, ...updateData });
  }
}
