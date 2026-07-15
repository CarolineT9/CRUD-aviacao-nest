import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PilotosModule } from './pilotos/pilotos.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PilotosModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
