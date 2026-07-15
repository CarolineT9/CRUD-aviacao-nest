import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAeronaveDto } from './DTO/create-aeronave';
import { Prisma } from '@prisma/client';
@Injectable()
export class AeronavesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAeronaveDto) {
    try {
      return await this.prisma.aeronave.create({
        data: dto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          'Já existe um piloto com essa matrícula.',
        );
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.aeronave.findMany();
  }
}
