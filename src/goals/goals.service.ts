import { Injectable } from '@nestjs/common';
import { Goal, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

const GOALS: Goal[] = [
  {
    id: 1,
    text: 'Eat better',
    completed: false,
  },
  {
    id: 2,
    text: 'Drink more water',
    completed: false,
  },
  {
    id: 3,
    text: 'Work out',
    completed: false,
  },
];

@Injectable()
export class GoalsService {
  constructor(private prisma: PrismaService) {}

  async createGoal(data: Prisma.GoalCreateInput): Promise<Goal> {
    return this.prisma.goal.create({ data });
  }

  async editGoal(params: {
    where: Prisma.GoalWhereUniqueInput;
    data: Prisma.GoalUpdateInput;
  }): Promise<Goal> {
    const { where, data } = params;
    return this.prisma.goal.update({
      where,
      data,
    });
  }

  async findGoal(where: Prisma.GoalWhereUniqueInput): Promise<Goal> {
    return this.prisma.goal.findUnique({
      where,
    });
  }

  async findGoals(): Promise<Goal[]> {
    return this.prisma.goal.findMany();
  }

  async deleteGoal(where: Prisma.GoalWhereUniqueInput): Promise<Goal> {
    return this.prisma.goal.delete({ where });
  }
}
