import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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
    private readonly logger = new Logger(BooksService.name),
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const target = await this.bookRepository.findOneBy({ id });

    if (!target) {
      throw new NotFoundException(`ID가 ${id}인 책이 존재하지 않습니다.`);
    }

    return target;
  }

  async create(createBookData: CreateBookDto): Promise<Book> {
    this.logger.log(createBookData);
    const queryRunner =
      this.bookRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingBook = await queryRunner.manager.findOne(Book, {
        where: { title: createBookData.title },
      });

      if (existingBook) {
        throw new ConflictException('같은 이름의 책이 존재합니다.');
      }

      const newBook = this.bookRepository.create(createBookData);
      const savedBook = await queryRunner.manager.save(newBook);

      await queryRunner.commitTransaction();

      return savedBook;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
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
