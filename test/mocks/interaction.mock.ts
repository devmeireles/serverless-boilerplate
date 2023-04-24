// import
import { faker } from '@faker-js/faker';
import { Interaction } from '@/types';
import { v4 } from 'uuid';

const id = v4();

export const getInteractionMock = jest.fn(
  (): Interaction => ({
    PK: `INTERACTION#${id}`,
    SK: `INTERACTION#${id}`,
    title: faker.lorem.sentence(4),
    content: faker.lorem.paragraphs(2),
    createdAt: new Date().getTime(),
  })
);

export const getInteractionUpdatingMock = jest.fn(
  (): Partial<Interaction> => ({
    content: faker.lorem.paragraphs(2),
  })
);
