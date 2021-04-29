# sortable-properties

Small set of utilities based on TypeScript decorators and [class-validator](https://github.com/typestack/class-validator) that make validation of sortable properties easy.

## Why

Let's say you are building REST API using TypeScript. You have domain models (+ maybe view models or more...) and you are using [class-validator](https://github.com/typestack/class-validator) to validate your requests. You want API consumers to be able to sort results by strictly defined set of keys which happens to be subset of your domain model property keys. Now you need to repeat yourself and store that sortable keys in separate array and pass it to `IsIn` class-validator's decorator. There is much space for errors that are hard to catch and it doesn't sound maintainable.

Solution is very simple. Take advantage of TypeScript decorators and `reflect-metadata` API to create property decorators that mark some of properties as sortable.

Or even more simple, just use this package which does exactly that and in addition provides specialized validator to make validation of sortable properties easier.

## Install

Install package with npm using

`npm i sortable-properties`

## How to use it

First, make sure you have imported `reflect-metadata` in your app root.

```typescript
import 'reflect-metadata';
```

Decorate model properties you want to be sortable with `Sortable` decorator imported from `sortable-properties`.

```typescript
import { Sortable } from 'sortable-properties';

export class Person {
  @Sortable()
  firstName: string;

  @Sortable()
  lastName: string;

  @Sortable()
  age: number;

  imagePath: string;
}
```

Now, in your request model decorate property that takes care of sorting with `IsSortableProperty` decorator imported from `sortable-properties`. `IsSortableProperty` takes class (type, constructor...) that you want sortable properties from as first argument and `validationOptions` as second argument which is standard `validationOptions` object from `class-validator`.

```typescript
import { IsSortableProperty } from 'sortable-properties';

export class QueryPersonsDto {
  @IsSortableProperty(Person) // equivalent to @IsIn(['firstName', 'lastName', 'age'])
  sortBy?: string;

  // other, not so relevant, properties
  // (listed only to make example more complete, not required)
  @IsIn(['asc', 'desc'])
  order: string;

  limit: number;
  offset: number;
}
```

You might have more complex use-case and you maybe need to mix sortable properties with some other keys. You can use `getSortableProperties` function imported from `sortable-properties` to get all properties decorated with `Sortable` decorator and then concatenate it with you custom keys array and use `IsIn` validator from `class-validator`.
It takes class (type, constructor...) that you want sortable properties from as only argument.

```typescript
import { IsIn } from 'class-validator';
import { getSortableProperties } from 'sortable-properties';

export class QueryPersonsDto {
  @IsIn([...getSortableProperties(Person), 'customKey1', 'customKey2'])
  sortBy?: string;
}
```
