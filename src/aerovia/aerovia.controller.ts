import { Controller, Get } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { AeroviaService } from './aerovia.service';
@Controller('aerovia')
export class AeroviaController {
  constructor(private readonly aeroviaService: AeroviaService) {}
  @Get()
  findAll() {
    return this.aeroviaService.findAll();
  }
  
  @Post()
  create(@Body() dto: any) {
    return this.aeroviaService.create(dto);
  }
}
