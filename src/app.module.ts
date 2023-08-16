import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GoalsModule } from './goals/goals.module';
import { HealthcheckController } from './healthcheck/healthcheck.controller';

@Module({
  imports: [
    GoalsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [HealthcheckController],
  providers: [],
})
export class AppModule {}
