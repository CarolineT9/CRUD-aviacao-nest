import { Controller, Get } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { AeroviaService } from './aerovia.service';
import { CreateAeroviaDto } from './DTO/create-aerovia';
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
}
