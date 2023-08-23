import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';

@Module({
  imports: [
    NestConfigModule.forRoot({}), // ConfigModule para carregar variáveis de ambiente de um arquivo .env
    TypeOrmModule.forRootAsync({
      imports: [NestConfigModule], // Importa o módulo de configuração
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql', // Tipo de banco de dados
          host: configService.get('DB_HOST'), // Variáveis do arquivo .env
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Caminho para as entidades
          synchronize: true, // Sincronizar esquemas em ambiente de desenvolvimento (não use em produção)
        } as ConnectionOptions;
      },
      inject: [ConfigService], // Injeta o ConfigService para obter variáveis de ambiente
    }),
  ],
  exports: [TypeOrmModule],
})
export class ConfigModule {}
