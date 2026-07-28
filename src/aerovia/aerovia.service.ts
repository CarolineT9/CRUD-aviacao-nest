import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Aerovia } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAeroviaDto } from './DTO/create-aerovia';
import { UpdateAeroviaDto } from './DTO/update-aerovia';
@Injectable()
export class AeroviaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAeroviaDto) {
    try {
      return await this.prisma.aerovia.create({
        data: dto,
      });
    } catch (error) {
      console.error(error);

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          'Já existe uma aerovia com esse identificador.',
        );
      }

      throw error;
    }
  }

  findAll() {
    return this.prisma.aerovia.findMany();
  }

  async findOne(id: number) {
    const aerovia = await this.prisma.aerovia.findUnique({
      where: { id },
    });

    if (!aerovia) {
      throw new NotFoundException('Aerovia não encontrada.');
    }

    return aerovia;
  }

  async update(id: number, dto: UpdateAeroviaDto) {
    await this.findOne(id);

    try {
      return await this.prisma.aerovia.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      await this.prisma.aerovia.delete({
        where: { id },
      });

      return {
        message: 'Aerovia removida com sucesso.',
      };
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new BadRequestException(
            'Já existe uma aerovia com esse identificador.',
          );

        case 'P2025':
          throw new NotFoundException('Aerovia não encontrada.');
      }
    }

    throw error;
  }
}
