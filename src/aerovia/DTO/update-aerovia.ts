import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateAeroviaDto {
  @IsOptional()
  @IsString()
  identificador?: string;

  @IsOptional()
  @IsString()
  origem?: string;

  @IsOptional()
  @IsString()
  destino?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  tamanho?: number;
}