import { RequestHandler } from 'express';
import 'reflect-metadata';
import { MetadaKeys } from './MetadatKeys';

export function use(handler: RequestHandler): Function {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    //check if the target key has already this metadata

    const middlewares: Function[] =
      Reflect.getMetadata(MetadaKeys.Middleware, target, key) || [];
    Reflect.defineMetadata(
      MetadaKeys.Middleware,
      [...middlewares, handler],
      target,
      key
    );
  };
}
