import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum TipoAeronave {
  PARTICULAR = 'PARTICULAR',
  PASSAGEIRO = 'PASSAGEIRO',
  CARGA = 'CARGA',
}

export class CreateAeronaveDto {
  @IsString()
  prefixo: string;

  @IsEnum(TipoAeronave)
  tipo: TipoAeronave;

  @IsInt()
  velocidadeCruzeiro: number;

  @IsInt()
  autonomia: number;

  // Particular
  @IsOptional()
  @IsString()
  respManutencao?: string;

  // Comercial
  @IsOptional()
  @IsString()
  nomeCia?: string;

  // Passageiro
  @IsOptional()
  @IsInt()
  maxPassageiros?: number;

  // Carga
  @IsOptional()
  @IsNumber()
  pesoMax?: number;
}