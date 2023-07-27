import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('getAll은 배열을 반환해야한다', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('getOne은 하나의 영화데이터를 반환해야한다', () => {
      service.create({
        title: 'test',
        year: 2000,
        genres: [],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('404에러를 던저야한다', () => {
      try {
        service.getOne(99);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID : 99');
      }
    });
  });

  describe('deleteOne', () => {
    it('영화 하나를 삭제하기', () => {
      service.create({
        title: 'TEST',
        year: 2342,
        genres: ['test'],
      });
    });
  });
});
