import { Test, TestingModule } from '@nestjs/testing';
import { GoalsResolver } from './goals.resolver';
import { GoalsService } from './goals.service';
import { Prisma } from '@prisma/client';
import { Goal } from './models/goal.model';

describe('GoalsResolver', () => {
  let resolver: GoalsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoalsResolver,
        {
          provide: GoalsService,
          useFactory: () => ({
            createGoal: jest.fn((data: Prisma.GoalCreateInput) => ({
              id: 123,
              ...data,
            })),
            findGoals: jest.fn(() => [
              {
                id: 1,
                text: 'First Goal',
                completed: false,
              },
              {
                id: 2,
                text: 'Second Goal',
                completed: true,
              },
            ]),
            findGoal: jest.fn((where: Prisma.GoalWhereUniqueInput) => ({
              id: where.id,
              text: 'First Goal',
              completed: false,
            })),
            editGoal: jest.fn(
              (params: {
                where: Prisma.GoalWhereUniqueInput;
                data: Prisma.GoalUpdateInput;
              }) => ({
                id: params.where.id,
                ...params.data,
              }),
            ),
            deleteGoal: jest.fn((where: Prisma.GoalWhereUniqueInput) => ({
              id: where.id,
              text: 'Goal Deleted',
              completed: false,
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<GoalsResolver>(GoalsResolver);
  });

  it('should exist', () => {
    expect(resolver).toBeDefined();
  });

  it('should return array of goals', async () => {
    let test = await resolver.goals();
    expect(test).toEqual([
      {
        id: 1,
        text: 'First Goal',
        completed: false,
      },
      {
        id: 2,
        text: 'Second Goal',
        completed: true,
      },
    ]);
  });

  it('should return one goal with the given id', async () => {
    let test = await resolver.goal(1);
    expect(test).toEqual({
      id: 1,
      text: 'First Goal',
      completed: false,
    });
  });

  it('should update one existing goal with the given input', async () => {
    let testGoal: Goal = {
      id: 1,
      text: 'Edited Goal',
      completed: false,
    };
    let test = await resolver.editGoal(
      testGoal.id,
      testGoal.text,
      testGoal.completed,
    );
    expect(test).toEqual({ ...testGoal });
  });

  it('should create one goal with the given input', async () => {
    let testGoal: Goal = {
      id: 123,
      text: 'Created Goal',
      completed: false,
    };
    let test = await resolver.newGoal(testGoal.text, testGoal.completed);
    expect(test).toEqual({ ...testGoal });
  });

  it('should remove one goal with the given id', async () => {
    let test = await resolver.deleteGoal(123);
    expect(test).toEqual({
      id: 123,
      text: 'Goal Deleted',
      completed: false,
    });
  });
});
