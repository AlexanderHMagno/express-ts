import 'reflect-metadata';

// This file contents a list of decoratos:

export class Bottle {
  @fieldDecorator
  color: string = 'gray';

  constructor(private name: string) {}

  @logMethod
  greet(@logParameter greeting: string, @logParameter age: number): string {
    return `${greeting}, my name is ${this.bottleName} my age is ${age}`;
  }

  showMe() {
    console.log('alex');
  }

  get bottleName(): string {
    return this.name;
  }
}

//This decorator will work for functions, the descriptor is attached to the proto
function logInfo(target: any, key: string, desc: PropertyDescriptor) {
  // console.log('target', target);
  // console.log('key', key);
  // console.log('desc', desc);

  console.log(target[key]);

  const originalMethod = desc.value;

  desc.value = function (...args: any[]) {
    console.log(`Calling ${key} with arguments: ${JSON.stringify(args)}`);
    const result = originalMethod.apply(this, args);
    console.log(`Result of ${key}: ${result}`);
    return result;
  };

  return desc;
}

function logMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const indices = Reflect.getOwnMetadata(
      `log_${propertyKey}_parameters`,
      target,
      propertyKey
    );
    if (indices) {
      indices.forEach((index: number) => {
        const arg = args[index];
        console.log(`Parameter at index ${index} for ${propertyKey}: ${arg}`);
      });
    }
    return method.apply(this, args);
  };

  return descriptor;
}

//properties dont have descriptors
function fieldDecorator(target: any, key: string) {
  console.log('target field', target);
  console.log('key field ', key);
}

//argument decorator

function argDecorator(target: Bottle, porpertyKey: string, paramIndex: number) {
  console.log('target ar', target);
  console.log('porpertyKey arg ', porpertyKey); //Displays the name of the function
  console.log('paramIndex arg', paramIndex); // Displays the position of the argument in the args array
}

function logParameter(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  console.log('target arg ', target);
  console.log('propertKey arg ', propertyKey); //Displays the name of the function
  console.log('paramIndex arg', parameterIndex); // Displays the position of the argument in the args array

  const metadataKey = `log_${propertyKey}_parameters`;
  const indices =
    Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];
  indices.push(parameterIndex);
  Reflect.defineMetadata(metadataKey, indices, target, propertyKey);
}

//class decorator
