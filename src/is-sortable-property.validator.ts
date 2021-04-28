import { IsIn, ValidationOptions } from 'class-validator';
import { Constructible } from './constructible.type';
import { getSortableProperties } from './get-sortable-properties.utility';

/**
 * Validates that value is one of type's property names decorated with Sortable decorator.
 * @param type Type whose properties are checked.
 * @param validationOptions Standard class-validator ValidationOptions
 */
export function IsSortableProperty(
  type: Constructible,
  validationOptions?: ValidationOptions,
): Function {
  return IsIn(getSortableProperties(type), validationOptions);
}
