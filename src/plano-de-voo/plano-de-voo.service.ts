import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePlanoDeVooDto } from './DTO/create-plano-de-voo';
import { TipoAeronave } from '@prisma/client';

@Injectable()
export class PlanoDeVooService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePlanoDeVooDto) {
    // Busca piloto
    const piloto = await this.prisma.piloto.findUnique({
      where: {
        id: dto.pilotoId,
      },
    });

    if (!piloto) {
      throw new NotFoundException('Piloto não encontrado.');
    }

    if (!piloto.isAtivo) {
      throw new BadRequestException('Piloto com habilitação inativa.');
    }

    // Busca aeronave
    const aeronave = await this.prisma.aeronave.findUnique({
      where: {
        id: dto.aeronaveId,
      },
    });

    if (!aeronave) {
      throw new NotFoundException('Aeronave não encontrada.');
    }

    // Busca aerovia
    const aerovia = await this.prisma.aerovia.findUnique({
      where: {
        id: dto.aeroviaId,
      },
    });

    if (!aerovia) {
      throw new NotFoundException('Aerovia não encontrada.');
    }

    // Validação autonomia 10% maior
    const autonomiaNecessaria = aerovia.tamanho * 1.1;

    if (aeronave.autonomia < autonomiaNecessaria) {
      throw new BadRequestException(
        'A aeronave não possui autonomia suficiente para essa aerovia.',
      );
    }

    // Validação altitude
    this.validarAltitude(aeronave.tipo, dto.altitude);

    // Validação horário carga
    this.validarHorario(aeronave.tipo, dto.horario);

    // Calcula slots necessários
    const slots = this.calcularSlots(
      aerovia.tamanho,
      aeronave.velocidadeCruzeiro,
      dto.horario,
    );

    // Verifica se slots estão ocupados
    const ocupacaoExistente = await this.prisma.ocupacaoAerovia.findMany({
      where: {
        aeroviaId: dto.aeroviaId,
        data: new Date(dto.data),
        altitude: dto.altitude,
        slot: {
          in: slots,
        },
      },
    });

    if (ocupacaoExistente.length > 0) {
      throw new BadRequestException(
        'Já existe um voo utilizando essa altitude e horário.',
      );
    }

    // Cria plano + ocupação
    const plano = await this.prisma.planoDeVoo.create({
      data: {
        pilotoId: dto.pilotoId,
        aeronaveId: dto.aeronaveId,
        aeroviaId: dto.aeroviaId,
        data: new Date(dto.data),
        horario: dto.horario,
        altitude: dto.altitude,
        slots,
      },
    });

    await this.prisma.ocupacaoAerovia.createMany({
      data: slots.map((slot) => ({
        aeroviaId: dto.aeroviaId,
        data: new Date(dto.data),
        altitude: dto.altitude,
        slot,
      })),
    });

    return plano;
  }

  async findAll() {
    return this.prisma.planoDeVoo.findMany({
      include: {
        piloto: true,
        aeronave: true,
        aerovia: true,
      },
    });
  }

  async findOne(id: number) {
    const plano = await this.prisma.planoDeVoo.findUnique({
      where: {
        id,
      },
      include: {
        piloto: true,
        aeronave: true,
        aerovia: true,
      },
    });

    if (!plano) {
      throw new NotFoundException('Plano de voo não encontrado.');
    }

    return plano;
  }

  async cancelar(id: number) {
    const plano = await this.findOne(id);

    if (plano.cancelado) {
      throw new BadRequestException('Plano já está cancelado.');
    }

    // libera slots
    await this.prisma.ocupacaoAerovia.deleteMany({
      where: {
        aeroviaId: plano.aeroviaId,
        data: plano.data,
        altitude: plano.altitude,
      },
    });

    return this.prisma.planoDeVoo.update({
      where: {
        id,
      },
      data: {
        cancelado: true,
      },
    });
  }

  private validarAltitude(tipo: TipoAeronave, altitude: number) {
    switch (tipo) {
      case TipoAeronave.PASSAGEIRO:
        if (altitude <= 28000) {
          throw new BadRequestException(
            'Aeronave de passageiros deve voar acima de 28000 pés.',
          );
        }

        break;

      case TipoAeronave.PARTICULAR:
        if (altitude < 25000 || altitude > 27000) {
          throw new BadRequestException(
            'Aeronave particular deve voar entre 25000 e 27000 pés.',
          );
        }

        break;

      case TipoAeronave.CARGA:
        break;
    }
  }

  private validarHorario(tipo: TipoAeronave, horario: string) {
    if (tipo !== TipoAeronave.CARGA) {
      return;
    }

    const hora = Number(horario.split(':')[0]);

    if (hora < 0 || hora >= 6) {
      throw new BadRequestException(
        'Aeronave de carga só pode voar entre 00:00 e 06:00.',
      );
    }
  }

  private calcularSlots(
    tamanho: number,
    velocidade: number,
    horario: string,
  ): number[] {
    const tempo = tamanho / velocidade;

    const quantidadeSlots = Math.ceil(tempo);

    const horaInicial = Number(horario.split(':')[0]);

    return Array.from(
      {
        length: quantidadeSlots,
      },
      (_, index) => horaInicial + index,
    );
  }
}
