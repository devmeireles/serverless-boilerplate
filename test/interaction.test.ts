import {
  getInteractionMock,
  getInteractionUpdatingMock,
} from './mocks/interaction.mock';
import {
  create,
  findAll,
  findOne,
  remove,
  update,
} from '../src/modules/interaction/handler';
import { getMockApiGatewayEvent } from './mocks/gatewayEvent.mock';
import { getMockApiContext } from './mocks/gatewayContext.mock';
import { getIdFromKey } from '@/helpers';
import { v4 } from 'uuid';

describe(`Interaction`, () => {
  let FIRST_INTERACTION_ID: string;
  let NEW_INTERACTION_ID: string;

  it(`should return a list of interactions`, async () => {
    const interaction = getInteractionMock();
    const event = getMockApiGatewayEvent();
    const context = getMockApiContext();

    const { body, statusCode } = await findAll(event, context);
    const resultInteractions = JSON.parse(body);

    const resultKeys = Object.keys(resultInteractions.data[0]).sort();

    expect(resultInteractions).toHaveProperty(`data`);
    expect(resultInteractions).toHaveProperty(`success`);
    const staticKeys = Object.keys(interaction).sort();
    expect(resultKeys).toMatchObject(staticKeys);

    expect(statusCode).toEqual(200);

    FIRST_INTERACTION_ID = getIdFromKey(resultInteractions.data[0].PK);
  });

  it(`should return an interaction by ID`, async () => {
    const interaction = getInteractionMock();
    const event = getMockApiGatewayEvent();
    const context = getMockApiContext();

    Object.assign(event, {
      pathParameters: {
        id: FIRST_INTERACTION_ID,
      },
    });

    const { body, statusCode } = await findOne(event, context);
    const resultInteraction = JSON.parse(body);

    const resultKeys = Object.keys(resultInteraction.data).sort();

    expect(resultInteraction).toHaveProperty(`data`);
    expect(resultInteraction).toHaveProperty(`success`);
    const staticKeys = Object.keys(interaction).sort();
    expect(resultKeys).toMatchObject(staticKeys);

    expect(statusCode).toEqual(200);
  });

  it(`should update an interaction by ID`, async () => {
    const interaction = getInteractionMock();
    const event = getMockApiGatewayEvent();
    const context = getMockApiContext();

    Object.assign(event, {
      pathParameters: {
        id: FIRST_INTERACTION_ID,
      },
      body: JSON.stringify(getInteractionUpdatingMock()),
    });

    const { body, statusCode } = await update(event, context);
    const resultInteraction = JSON.parse(body);

    const resultKeys = Object.keys(resultInteraction.data).sort();

    expect(resultInteraction).toHaveProperty(`data`);
    expect(resultInteraction).toHaveProperty(`success`);
    const staticKeys = Object.keys(interaction).sort();
    expect(resultKeys).toMatchObject(staticKeys);

    expect(statusCode).toEqual(200);
  });

  it(`should create an interaction`, async () => {
    const interaction = getInteractionMock();
    const event = getMockApiGatewayEvent();
    const context = getMockApiContext();

    Object.assign(event, {
      body: JSON.stringify(getInteractionMock()),
    });

    const { body, statusCode } = await create(event, context);
    const resultInteraction = JSON.parse(body);

    const resultKeys = Object.keys(resultInteraction.data).sort();

    expect(resultInteraction).toHaveProperty(`data`);
    expect(resultInteraction).toHaveProperty(`success`);
    const staticKeys = Object.keys(interaction).sort();
    expect(resultKeys).toMatchObject(staticKeys);

    expect(statusCode).toEqual(200);

    NEW_INTERACTION_ID = getIdFromKey(resultInteraction.data.PK);
  });

  it(`shouldn't create an interactions due an empty body`, async () => {
    const event = getMockApiGatewayEvent();
    const context = getMockApiContext();

    Object.assign(event, {
      body: JSON.stringify({}),
    });

    const { body, statusCode } = await create(event, context);
    const resultInteraction = JSON.parse(body);

    expect(resultInteraction).not.toHaveProperty(`data`);
    expect(resultInteraction).toHaveProperty(`error`);

    expect(statusCode).toEqual(400);
  });

  it(`should remove an interaction by ID`, async () => {
    const event = getMockApiGatewayEvent();
    const context = getMockApiContext();

    Object.assign(event, {
      pathParameters: {
        id: NEW_INTERACTION_ID,
      },
    });

    const { statusCode } = await remove(event, context);
    expect(statusCode).toEqual(200);
  });

  it(`shouldn't return an interaction by ID because the item doesn't exist`, async () => {
    const event = getMockApiGatewayEvent();
    const context = getMockApiContext();

    Object.assign(event, {
      pathParameters: {
        id: v4(),
      },
    });

    const { body, statusCode } = await findOne(event, context);
    const resultInteraction = JSON.parse(body);

    expect(resultInteraction).not.toHaveProperty(`data`);
    expect(resultInteraction).toHaveProperty(`error`);

    expect(statusCode).toEqual(404);
  });
});
