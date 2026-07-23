import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateAeronaveDto {
  @IsString()
  prefixo: string;

  @IsInt()
  @IsPositive()
  autonomia: number;

  @IsPositive()
  velocidadeCruzeiro: number;
}