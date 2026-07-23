import { PartialType } from '@nestjs/mapped-types';
import { CreatePilotoDto } from './create-piloto';

export class UpdatePilotoDto extends PartialType(CreatePilotoDto) {}