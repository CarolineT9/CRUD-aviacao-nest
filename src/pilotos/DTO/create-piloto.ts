import { IsNotEmpty, IsString } from 'class-validator';
export class CreatePilotoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  matricula: string;
}
