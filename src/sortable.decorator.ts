import { MetadataKey } from './constants';

/**
 * Adds property to sortableProperties metadata array.
 * Can be used in conjunction with IsSortableProperty validator.
 */
export function Sortable(): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    const sortableProperties: string[] =
      Reflect.getMetadata(MetadataKey.SORTABLE_PROPERTIES, target) || [];
    Reflect.defineMetadata(
      MetadataKey.SORTABLE_PROPERTIES,
      [...sortableProperties, propertyKey],
      target,
    );
  };
}
