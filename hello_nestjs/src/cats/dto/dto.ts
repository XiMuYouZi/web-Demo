export class CreateCatDto {
    readonly name   : string;
    readonly age: number;
    breed: string;
  }

  export class UpdateCatDto{

  }

  export class ListAllEntities{
    limit:number;
  }