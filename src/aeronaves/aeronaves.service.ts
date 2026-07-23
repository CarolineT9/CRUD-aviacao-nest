import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
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
          'Já existe uma aeronave com esse prefixo.',
        );
      }

      throw error;
    }
  }

  findAll() {
    return this.prisma.aeronave.findMany();
  }

  async update(id: number, dto: Partial<CreateAeronaveDto>) {
    const aeronave = await this.prisma.aeronave.findUnique({
      where: { id },
    });

    if (!aeronave) {
      throw new NotFoundException('Aeronave não encontrada.');
    }

    return this.prisma.aeronave.update({
      where: { id },
      data: dto,
    });
  }
}