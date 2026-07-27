import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePlanoDeVooDto {
  @IsInt()
  @IsNotEmpty()
  pilotoId: number;

  @IsInt()
  @IsNotEmpty()
  aeroviaId: number;

  @IsDateString()
  @IsNotEmpty()
  data: string;

  @IsString()
  @IsNotEmpty()
  horario: string;

  @IsInt()
  @IsNotEmpty()
  altitude: number;

  @IsArray()
  @IsNotEmpty()
  slots: string[];

  @IsBoolean()
  @IsOptional()
  cancelado?: boolean;
}