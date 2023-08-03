import { Test, TestingModule } from '@nestjs/testing';
import { ProfessController } from './profess.controller';

describe('ProfessController', () => {
  let controller: ProfessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessController],
    }).compile();

    controller = module.get<ProfessController>(ProfessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
