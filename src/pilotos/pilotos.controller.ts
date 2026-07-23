import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PilotosService } from './pilotos.service';
import { CreatePilotoDto } from './DTO/create-piloto';
import { UpdatePilotoDto } from './DTO/update-piloto';
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

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePilotoDto: UpdatePilotoDto,
  ) {
    return this.pilotosService.update(id, updatePilotoDto);
  }
}
