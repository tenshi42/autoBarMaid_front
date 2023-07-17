export class Type {
  code: TypeCodeEnum
  label: string

  constructor(code: TypeCodeEnum, label: string) {
    this.code = code;
    this.label = label;
  }
}

export enum TypeCodeEnum {
  COCKTAIL,
  FLASH
}

export const TypeEnum: Type[] = [
  {
    code: TypeCodeEnum.COCKTAIL,
    label: "Cocktail"
  },
  {
    code: TypeCodeEnum.FLASH,
    label: "Flash"
  }
]
