import { IsString } from 'class-validator';
import { BaseValidator } from '@/helpers';

export class InteractionValidator extends BaseValidator {
  @IsString()
  title: string;

  @IsString()
  content: string;

  constructor(arg: Record<string, any>) {
    super();
    Object.assign(this, arg);
  }
}
