import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePilotoDto } from './DTO/create-piloto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PilotosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePilotoDto) {
    try {
      return await this.prisma.piloto.create({
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

  async findAll() {
    return await this.prisma.piloto.findMany();
  }
}
