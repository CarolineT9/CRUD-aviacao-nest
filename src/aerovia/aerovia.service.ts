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

  /**
   * Finds all available altitudes for a given airway, date and time.
   *
   * @param airwayId Identificador da aerovia.
   * @param date Data do voo.
   * @param time Horário do voo no formato "HH:mm".
   * @returns Lista de altitudes disponíveis.
   */
  async findAvailableAltitudes(
    airwayId: number,
    date: string,
    time: string,
  ): Promise<number[]> {
    const slot = Number(time.split(':')[0]);

    const occupiedAltitudes = await this.prisma.ocupacaoAerovia.findMany({
      where: {
        aeroviaId: airwayId,
        data: new Date(date),
        slot,
      },
    });

    const availableAltitudes = [
      25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000,
      35000,
    ];

    return availableAltitudes.filter(
      (altitude) =>
        !occupiedAltitudes.some((occupied) => occupied.altitude === altitude),
    );
  }

  /**
   * Busca todas as altitudes disponíveis para uma determinada aerovia,
   * considerando uma data e um horário específicos.
   *
   * @param airwayId Identificador da aerovia.
   * @param date Data do voo.
   * @param time Horário do voo no formato "HH:mm".
   * @returns Lista contendo as altitudes que não possuem ocupação no horário informado.
   */
  async findRoutes(origin: string, destination: string): Promise<Aerovia[]> {
    return this.prisma.aerovia.findMany({
      where: {
        origem: origin,
        destino: destination,
      },
    });
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
