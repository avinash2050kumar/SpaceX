/**
 * Matches any [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive).
 */
export type Primitive = null | undefined | string | number | boolean | symbol;

/**
 Allows creating a union type by combining primitive types and literal types without sacrificing auto-completion in IDEs for the literal type part of the union.
 Currently, when a union type of a primitive type is combined with literal types, TypeScript loses all information about the combined literals. Thus,
 when such type is used in an IDE with autocompletion,
 no suggestions are made for the declared literals.
 This type is a workaround for [Microsoft/TypeScript#29729](https://github.com/Microsoft/TypeScript/issues/29729). It will be removed as soon as it's not needed anymore.
 @example
 ```
 // Before
 type Pet = 'dog' | 'cat' | string;
 const pet: Pet = '';
 // Start typing in your TypeScript-enabled IDE.
 // You **will not** get auto-completion for `dog` and `cat` literals.
 // After
 type Pet2 = LiteralUnion<'dog' | 'cat', string>;
 const pet: Pet2 = '';
 // You **will** get auto-completion for `dog` and `cat` literals.
 ```
 */
export type LiteralUnion<
	LiteralType extends BaseType,
	BaseType extends Primitive,
> = LiteralType | (BaseType & { _?: never });

export type Merge<FirstType, SecondType> = Omit<FirstType, keyof SecondType> &
	SecondType;

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
	T extends (...args: any) => Promise<infer R> ? R : any;
