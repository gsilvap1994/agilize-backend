import { ConflictException, NotFoundException } from "@nestjs/common";
import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { GoalsService } from "./goals.service";
import { Goal } from "./models/goal.model";

@Resolver(of => Goal)
export class GoalsResolver {
    constructor( private readonly goalsService: GoalsService ) {}

    @Query(returns => [Goal])
    async findGoals(): Promise<Goal[]> {
        return this.goalsService.findGoals();
    }

    @Query(returns => Goal)
    async findGoal(@Args('id') id: number): Promise<Goal> {
        const goal = await this.goalsService.findGoal({ id});
        if(!goal) {
            throw new NotFoundException(id);
        }

        return goal;
    }

    @Mutation(returns => Goal)
    async newGoal(@Args('text') text: string, @Args('completed') completed: boolean ): Promise<Goal> {
        const goal = await this.goalsService.createGoal({ text, completed });

        if(!goal) {
            throw new ConflictException(text);
        }

        return goal;
    }

    @Mutation(returns => Goal)
    async editGoal(
        @Args('id') id: number,
        @Args('text') text: string,
        @Args('completed') completed: boolean): Promise<Goal> {
            
            const goal = await this.goalsService.editGoal({ where: { id }, data: { text, completed }});

            if(!goal) {
                throw new ConflictException(text);
            }

            return goal;
    }

    @Mutation(returns => Goal)
    async deleteGoal(@Args('id') id: number): Promise<Goal> {
        const goal = await this.goalsService.deleteGoal({ id });

        if(!goal) {
            throw new NotFoundException(id)
        }

        return goal;
    }
}