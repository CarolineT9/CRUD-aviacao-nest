import { IsNotEmpty, IsString } from 'class-validator';

export class FindRoutesDTO {
  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;
}
