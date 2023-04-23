import { v4 } from 'uuid';
import { dynamo } from '@/helpers';
import { Interaction } from '@/types';
import CreateInteractionDTO from './dto/createInteraction.dto';
import UpdateInteractionDTO from './dto/updateInteraction.dto';

const TableName: string = process.env.MAIN_TABLE;

const create = async (data: CreateInteractionDTO): Promise<Interaction> => {
  const id = v4();
  const interaction: Interaction = {
    ...data,
    SK: `INTERACTION#${id}`,
    PK: `INTERACTION#${id}`,
    createdAt: new Date().getTime(),
  };

  await dynamo.put({
    TableName,
    Item: interaction,
  });

  return interaction;
};

const findAll = async (): Promise<Interaction[]> => {
  try {
    const data = (
      await dynamo.scan({
        TableName,
      })
    ).Items as Interaction[];

    return data;
  } catch (error) {
    console.log(error);
  }
};

const findOne = async (id: string): Promise<Interaction> => {
  const data = await dynamo.get({
    TableName,
    Key: {
      PK: `INTERACTION#${id}`,
      SK: `INTERACTION#${id}`,
    },
  });

  if (!data || Object.keys(data).length === 0) return;

  return data.Item as Interaction;
};

const update = async (
  id: string,
  data: UpdateInteractionDTO
): Promise<Interaction> => {
  const item = await findOne(id);
  const updatingData: Interaction = {
    ...item,
    ...data,
  };

  await dynamo.put({
    TableName,
    Item: updatingData,
  });

  return updatingData;
};

const remove = async (id: string): Promise<void> => {
  const item = await findOne(id);

  await dynamo.delete({
    TableName,
    Key: {
      PK: item.PK,
      SK: item.SK,
    },
  });
};

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
