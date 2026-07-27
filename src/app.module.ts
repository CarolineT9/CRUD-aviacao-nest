import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PilotosModule } from './pilotos/pilotos.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AeronavesModule } from './aeronaves/aeronaves.module';
import { AeroviaModule } from './aerovia/aerovia.module';
import { PlanoDeVooModule } from './plano-de-voo/plano-de-voo.module';

@Module({
  imports: [PilotosModule, PrismaModule, AeronavesModule, AeroviaModule, PlanoDeVooModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
