import { validateOrReject, ValidationError } from 'class-validator';

export class BaseValidator {
  async validate(): Promise<Record<any, string>> {
    try {
      await validateOrReject(this);
    } catch (err) {
      const validationErrors = err as ValidationError[];
      const errorsList: Record<string, string> = validationErrors.reduce(
        (prevError, currError) => {
          const property = currError.property;
          const message = Object.values(currError.constraints!)[0];
          return { ...prevError, [property]: message };
        },
        {}
      );

      if (Object.keys(errorsList).length > 0) {
        return errorsList;
      }
    }
  }
}
