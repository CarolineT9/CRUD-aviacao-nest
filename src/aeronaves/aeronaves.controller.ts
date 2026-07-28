import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateAeronaveDto } from './DTO/create-aeronave';
import { UpdateAeronaveDto } from './DTO/update-aeronave';
import { AeronavesService } from './aeronaves.service';

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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.aeronavesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAeronaveDto,
  ) {
    return this.aeronavesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.aeronavesService.remove(id);
  }
}
