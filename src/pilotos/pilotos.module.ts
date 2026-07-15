import { Module } from '@nestjs/common';
import { PilotosService } from './pilotos.service';
import { PilotosController } from './pilotos.controller';

@Module({
  providers: [PilotosService],
  controllers: [PilotosController]
})
export class PilotosModule {}
