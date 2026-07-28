import {
  IsDateString,
  IsInt,
  IsString,
  IsPositive,
} from 'class-validator';

export class CreatePlanoDeVooDto {
  @IsInt()
  @IsPositive()
  pilotoId: number;

  @IsInt()
  @IsPositive()
  aeronaveId: number;

  @IsInt()
  @IsPositive()
  aeroviaId: number;

  @IsDateString()
  data: string;

  @IsString()
  horario: string;

  @IsInt()
  altitude: number;
}