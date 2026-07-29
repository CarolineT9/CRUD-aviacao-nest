import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PlanoDeVooService } from './plano-de-voo.service';
import { CreatePlanoDeVooDto } from './DTO/create-plano-de-voo';
import { FindAvailableAltitudesDto } from 'src/aerovia/DTO/find-available-altitudes';

@Controller('plano-de-voo')
export class PlanoDeVooController {
  constructor(private readonly planoDeVooService: PlanoDeVooService) {}

  @Post()
  create(@Body() dto: CreatePlanoDeVooDto) {
    return this.planoDeVooService.create(dto);
  }

  @Get()
  findAll() {
    return this.planoDeVooService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.planoDeVooService.findOne(id);
  }

  @Patch(':id/cancelar')
  cancelar(@Param('id', ParseIntPipe) id: number) {
    return this.planoDeVooService.cancelar(id);
  }
}
