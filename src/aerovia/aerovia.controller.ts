import { Controller, Get, Query } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { AeroviaService } from './aerovia.service';
import { CreateAeroviaDto } from './DTO/create-aerovia';
import { FindRoutesDTO } from './DTO/find-routes';
import { FindAvailableAltitudesDto } from './DTO/find-available-altitudes';
@Controller('aerovia')
export class AeroviaController {
  constructor(private readonly aeroviaService: AeroviaService) {}
  @Get()
  findAll() {
    return this.aeroviaService.findAll();
  }

  @Post()
  create(@Body() dto: CreateAeroviaDto) {
    return this.aeroviaService.create(dto);
  }
  @Get('available-altitudes')
  findAvailableAltitudes(@Query() dto: FindAvailableAltitudesDto) {
    return this.aeroviaService.findAvailableAltitudes(
      dto.airwayId,
      dto.date,
      dto.time,
    );
  }
  @Get('routes')
  findRoutes(@Query() dto: FindRoutesDTO) {
    return this.aeroviaService.findRoutes(dto.origin, dto.destination);
  }
}
