import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, TipoAeronave } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAeronaveDto } from './DTO/create-aeronave';

@Injectable()
export class AeronavesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAeronaveDto) {
    try {
      switch (dto.tipo) {
        case TipoAeronave.PARTICULAR:
          return await this.prisma.aeronave.create({
            data: {
              prefixo: dto.prefixo,
              tipo: dto.tipo,
              velocidadeCruzeiro: dto.velocidadeCruzeiro,
              autonomia: dto.autonomia,
              particular: {
                create: {
                  respManutencao: dto.respManutencao!,
                },
              },
            },
            include: {
              particular: true,
            },
          });

        case TipoAeronave.PASSAGEIRO:
          return await this.prisma.aeronave.create({
            data: {
              prefixo: dto.prefixo,
              tipo: dto.tipo,
              velocidadeCruzeiro: dto.velocidadeCruzeiro,
              autonomia: dto.autonomia,
              comercial: {
                create: {
                  nomeCia: dto.nomeCia!,
                  passageiro: {
                    create: {
                      maxPassageiros: dto.maxPassageiros!,
                    },
                  },
                },
              },
            },
            include: {
              comercial: {
                include: {
                  passageiro: true,
                },
              },
            },
          });

        case TipoAeronave.CARGA:
          return await this.prisma.aeronave.create({
            data: {
              prefixo: dto.prefixo,
              tipo: dto.tipo,
              velocidadeCruzeiro: dto.velocidadeCruzeiro,
              autonomia: dto.autonomia,
              comercial: {
                create: {
                  nomeCia: dto.nomeCia!,
                  carga: {
                    create: {
                      pesoMax: dto.pesoMax!,
                    },
                  },
                },
              },
            },
            include: {
              comercial: {
                include: {
                  carga: true,
                },
              },
            },
          });

        default:
          throw new BadRequestException('Tipo de aeronave inválido.');
      }
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAll() {
    return this.prisma.aeronave.findMany({
      include: {
        particular: true,
        comercial: {
          include: {
            passageiro: true,
            carga: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const aeronave = await this.prisma.aeronave.findUnique({
      where: { id },
      include: {
        particular: true,
        comercial: {
          include: {
            passageiro: true,
            carga: true,
          },
        },
      },
    });

    if (!aeronave) {
      throw new NotFoundException('Aeronave não encontrada.');
    }

    return aeronave;
  }

  async update(id: number, dto: Partial<CreateAeronaveDto>) {
    const aeronave = await this.findOne(id);

    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.aeronave.update({
          where: { id },
          data: {
            prefixo: dto.prefixo,
            velocidadeCruzeiro: dto.velocidadeCruzeiro,
            autonomia: dto.autonomia,
          },
        });

        switch (aeronave.tipo) {
          case TipoAeronave.PARTICULAR:
            await tx.aeronaveParticular.update({
              where: {
                aeronaveId: id,
              },
              data: {
                respManutencao: dto.respManutencao,
              },
            });
            break;

          case TipoAeronave.PASSAGEIRO:
            await tx.aeronaveComercial.update({
              where: {
                aeronaveId: id,
              },
              data: {
                nomeCia: dto.nomeCia,
              },
            });

            await tx.aeronavePassageiro.update({
              where: {
                comercialId: aeronave.comercial!.id,
              },
              data: {
                maxPassageiros: dto.maxPassageiros,
              },
            });
            break;

          case TipoAeronave.CARGA:
            await tx.aeronaveComercial.update({
              where: {
                aeronaveId: id,
              },
              data: {
                nomeCia: dto.nomeCia,
              },
            });

            await tx.aeronaveCarga.update({
              where: {
                comercialId: aeronave.comercial!.id,
              },
              data: {
                pesoMax: dto.pesoMax,
              },
            });
            break;
        }
      });

      return this.findOne(id);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      await this.prisma.aeronave.delete({
        where: { id },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }

    return {
      message: 'Aeronave removida com sucesso.',
    };
  }

  private handlePrismaError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new BadRequestException(
            'Já existe uma aeronave com esse prefixo.',
          );

        case 'P2025':
          throw new NotFoundException('Registro não encontrado.');
      }
    }

    throw error;
  }
}