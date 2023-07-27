import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie-dto';
import { UpdateMovieDto } from './dto/update-movie-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  findOne(id: number): Promise<Movie> {
    const movie = this.movieRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Movie with ID : ${id}`);
    }

    return movie;
  }

  async remove(id: number): Promise<void> {
    this.findOne(id);
    await this.movieRepository.delete(id);
  }

  async create(movieData: CreateMovieDto): Promise<Movie> {
    try {
      const savedMovie = await this.movieRepository.save(movieData);
      return savedMovie;
    } catch (error) {}
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.findOne(id);
  }
}
