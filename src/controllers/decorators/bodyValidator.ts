import 'reflect-metadata';
import { MetadaKeys } from './MetadatKeys';
import { NextFunction, Request, Response } from 'express';

export function bodyValidator(...args: string[]): Function {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(MetadaKeys.BodyValidator, args, target, key);
  };
}

export function attachValidatorToMiddleware(requiredKeys: string[]) {
  // write a middleware
  return function (req: Request, res: Response, next: NextFunction): void {
    if (!req.body) {
      res.status(403).send('Please provide a valid Body');
      return;
    }

    for (const key of requiredKeys) {
      if (!req.body[key]) {
        res.status(422).send(`Please provide a valid ${key}`);
        return;
      }
    }
    //If the validation is ok jsut continue with the next one
    next();
  };
}
