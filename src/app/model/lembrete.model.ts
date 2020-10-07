export class Lembrete {
    constructor(
      public id?: number,
      public titulo?: string,
      public prioridade?: string,
      public descricao?: string,
    ){  }

    static fromJson(jsonData: any): Lembrete {
      return Object.assign(new Lembrete(), jsonData);
  }
  }
