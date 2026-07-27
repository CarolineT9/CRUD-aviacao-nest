import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAeroviaDto } from './DTO/create-aerovia';
import { Prisma } from '@prisma/client';
@Injectable()
export class AeroviaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAeroviaDto) {
    try {
      return await this.prisma.aerovia.create({
        data: dto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          'Já existe uma aerovia com esse tamanho.',
        );
      }
    }
  }

  findAll() {
    return this.prisma.aerovia.findMany();
  }
}
