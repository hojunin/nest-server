import { CreateMovieDto } from './dto/create-movie-dto';
import { UpdateMovieDto } from './dto/update-movie-dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  constructor(private readonly MoviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.MoviesService.getAll();
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `This will searching movie by year : ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    return this.MoviesService.getOne(movieId);
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDto) {
    return this.MoviesService.create(movieData);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') movieId: number) {
    return this.MoviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  patchMove(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.MoviesService.update(movieId, updateData);
  }
}
