
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Goal' })
export class Goal {
  @Field(type => ID)
  id: number;

  @Field()
  text: string;

  @Field()
  completed: boolean;

}