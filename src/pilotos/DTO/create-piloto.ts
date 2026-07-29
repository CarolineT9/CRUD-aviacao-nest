import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class CreatePilotoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  matricula: string;

  @IsBoolean()
  isAtivo: boolean;
}
