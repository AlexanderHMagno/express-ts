import 'reflect-metadata';
import { Methods } from './Methods';
import { MetadaKeys } from './MetadatKeys';

//Lets gonna update this code with a route Binder
function RouteBinder(method: string): Function {
  return function (path: string): Function {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      //This will attach metadat to the method itself
      Reflect.defineMetadata(MetadaKeys.Path, path, target, key);
      Reflect.defineMetadata(MetadaKeys.Method, method, target, key);
    };
  };
}

export const get = RouteBinder(Methods.get);
export const post = RouteBinder(Methods.post);
export const patch = RouteBinder(Methods.patch);
export const put = RouteBinder(Methods.put);
export const deleteMethod = RouteBinder(Methods.delete);
