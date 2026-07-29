import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsString } from 'class-validator';

export class FindAvailableAltitudesDto {
  @Type(() => Number)
  @IsInt()
  airwayId: number;

  @IsDateString()
  date: string;

  @IsString()
  time: string;
}