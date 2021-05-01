import 'reflect-metadata';
import { MetadataKey } from './constants';
import { Constructible } from './constructible.type';

export function getSortableProperties(type: Constructible): string[] {
  return Reflect.getMetadata(MetadataKey.SORTABLE_PROPERTIES, type.prototype);
}
