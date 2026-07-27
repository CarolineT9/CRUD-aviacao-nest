import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateAeroviaDto {
  @IsString()
  origem: string;

  @IsString()
  destino: string;

  @IsInt()
  @IsPositive()
  tamanho: number;
}