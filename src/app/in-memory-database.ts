import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Lembrete } from './model/lembrete.model';

export class InMemoryDatabase implements InMemoryDbService{

  // tslint:disable-next-line:typedef
  createDb(){
    const lembretes: Lembrete[] = [
      { id: 1, titulo: 'Aula de Ingles', prioridade: 'alta', descricao: 'Teste aula de ingles'},
      { id: 2, titulo: 'Aula de Matematica', prioridade: 'baixa', descricao: 'Teste aula de Matematica'},
      { id: 3, titulo: 'Aula de Programação', prioridade: 'alta', descricao: 'Teste aula de Programação'},
    ];

    return { lembretes };
  }
}
