import { Controller, Body, Post, Get } from '@nestjs/common';
import { PilotosService } from './pilotos.service';
import { CreatePilotoDto } from './DTO/create-piloto';
@Controller('pilotos')
export class PilotosController {
  constructor(private readonly pilotosService: PilotosService) {}

  @Post()
  create(@Body() createPilotoDto: CreatePilotoDto) {
    return this.pilotosService.create(createPilotoDto);
  }

  @Get()
  findAll() {
    return this.pilotosService.findAll();
  }
}
