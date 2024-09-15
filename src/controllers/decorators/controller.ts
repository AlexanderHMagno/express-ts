import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadaKeys } from './MetadatKeys';
export function Controller(routePrefix: string) {
  const Router = AppRouter.getInstance();
  return function (target: Function) {
    Object.getOwnPropertyNames(target.prototype).forEach((key) => {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetadaKeys.Path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(
        MetadaKeys.Method,
        target.prototype,
        key
      );

      const middleware = Reflect.getMetadata(
        MetadaKeys.Middleware,
        target.prototype,
        key
      );

      //This will be set as /prefix/path, and the handler is the function that was attached by
      // the routes decorator using reflect-metadata
      if (path) {
        Router[method](`${routePrefix}${path}`, ...middleware, routeHandler);
      }
    });
  };
}
