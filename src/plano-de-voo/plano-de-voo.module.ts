import { Module } from '@nestjs/common';
import { PlanoDeVooService } from './plano-de-voo.service';
import { PlanoDeVooController } from './plano-de-voo.controller';

@Module({
  providers: [PlanoDeVooService],
  controllers: [PlanoDeVooController]
})
export class PlanoDeVooModule {}
