import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateAeronaveDto } from './DTO/create-aeronave';
import { AeronavesService } from './aeronaves.service';
import { UpdateAeronaveDto } from './DTO/update-aeronave';  
@Controller('aeronaves')
export class AeronavesController {
  constructor(private readonly aeronavesService: AeronavesService) {}

  @Post()
  create(@Body() dto: CreateAeronaveDto) {
    return this.aeronavesService.create(dto);
  }

  @Get()
  findAll() {
    return this.aeronavesService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAeronaveDto,
  ) {
    return this.aeronavesService.update(id, dto);
  }
}
