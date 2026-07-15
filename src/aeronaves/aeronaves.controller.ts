import { Controller, Post, Body } from '@nestjs/common';
import { CreateAeronaveDto } from './DTO/create-aeronave';
import { AeronavesService } from './aeronaves.service';

@Controller('aeronaves')
export class AeronavesController {
  constructor(private readonly aeronavesService: AeronavesService) {}

  @Post()
  create(@Body() dto: CreateAeronaveDto) {
    return this.aeronavesService.create(dto);
    console.log(dto);
    console.log(typeof dto.prefixo);
    console.log(typeof dto.autonomia);
  }
}
