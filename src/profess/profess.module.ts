import { Module } from '@nestjs/common';
import { ProfessController } from './profess.controller';
import { ProfessService } from './profess.service';

@Module({
  controllers: [ProfessController],
  providers: [ProfessService]
})
export class ProfessModule {}
