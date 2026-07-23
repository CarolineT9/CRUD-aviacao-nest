import { PartialType } from '@nestjs/mapped-types';
import { CreateAeronaveDto } from './create-aeronave';

export class UpdateAeronaveDto extends PartialType(CreateAeronaveDto) {}