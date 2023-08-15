import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GoalsModule } from './goals/goals.module';

@Module({
  imports: [
    GoalsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql'
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
