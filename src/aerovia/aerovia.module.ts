import { Module } from '@nestjs/common';
import { AeroviaService } from './aerovia.service';
import { AeroviaController } from './aerovia.controller';

@Module({
  providers: [AeroviaService],
  controllers: [AeroviaController]
})
export class AeroviaModule {}
