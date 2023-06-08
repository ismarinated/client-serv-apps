import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatasourceModule } from './datasource/datasource.module';
import { VehiclesModule } from './vehicle/vehicles.module';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    VehiclesModule,
    UsersModule,
    OrdersModule,
    DatasourceModule,
    TypeOrmModule.forRoot ({
      type: 'postgres',
      port: 5432,
      database: 'education',
      username: 'postgres',
      password: 'Duckling_3000',
      host: 'localhost',
      synchronize: true,
      logging: 'all',
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}