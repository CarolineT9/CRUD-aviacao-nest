import { Module } from '@nestjs/common';
import { AeronavesService } from './aeronaves.service';
import { AeronavesController } from './aeronaves.controller';

@Module({
  providers: [AeronavesService],
  controllers: [AeronavesController]
})
export class AeronavesModule {}
