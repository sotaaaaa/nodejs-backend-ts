import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { IRequest, IResponse, INextFunction } from '../types/Server';
import { ClassType } from 'class-transformer/ClassTransformer';

import Resolve from '../helps/Resolve';

function validation(type: ClassType<unknown>, skipMissingProperties: boolean = false) {
  return (req: IRequest, res: IResponse, next: INextFunction) => {
    try {
      /**
       * Execute the entry requirements test
       */
      validate(plainToClass(type, req.body), {
        skipMissingProperties,
        whitelist: true,
        forbidNonWhitelisted: true,
      }).then((errors: ValidationError[]) => {
        /**
         * Return errors
         */
        if (errors.length > 0) {
          let response = [];
          errors.map((error: ValidationError) =>
            response.push({
              property: error.property,
              constraints: error.constraints,
            }),
          );
          Resolve.invalid(req, res, response);
        } else {
          // Pass the entrance test
          next();
        }
      });
    } catch (error) {
      Resolve.serverError(req, res, error);
    }
  };
}

export default validation;
