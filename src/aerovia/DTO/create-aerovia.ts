import { IsInt, IsPositive, IsString } from 'class-validator';
export class CreateAeroviaDto {
  @IsString()
  identificador: string;

  @IsString()
  origem: string;

  @IsString()
  destino: string;

  @IsInt()
  @IsPositive()
  tamanho: number;
}