import { APIGatewayEvent } from 'aws-lambda'
import { v4 } from 'uuid'
import { handler } from "@/helpers/"
import CreateInteractionDTO from './dto/createInteraction.dto';
import Interaction from 'types/interaction.type';

export const createInteraction = handler(
  async (event: APIGatewayEvent): Promise<Record<string, any>> => {

    const interaction: CreateInteractionDTO = JSON.parse(event.body);
    const interactionID = v4();
    const nowTS = new Date().getTime();

    const data: Interaction = {
      PK: `INTERACTION#${interactionID}`,
      SK: `INTERACTION#${interactionID}`,
      title: interaction.title,
      content: interaction.content,
      createdAt: nowTS,
    };

    return data;
  }
)
