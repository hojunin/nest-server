import { Test, TestingModule } from '@nestjs/testing';
import { ProfessService } from './profess.service';

describe('ProfessService', () => {
  let service: ProfessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessService],
    }).compile();

    service = module.get<ProfessService>(ProfessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
