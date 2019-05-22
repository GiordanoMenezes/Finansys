import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Categoria} from './sistema/models/categoria.model';

export class InMemoryDatabase implements InMemoryDbService {

    createDb() {
       const categories: Categoria[] = [
         {id: 1, name: 'Moradia', description: 'Pagamentos de Contas da Casa' },
         {id: 2, name: 'Saúde', description: 'Plano de Saúde e Remédios' },
         {id: 3, name: 'Lazer', description: 'Cinemas, Parques, Praia, etc' },
         {id: 4, name: 'Salário', description: 'Recebimento se Salário' },
         {id: 5, name: 'Freelancer', description: 'Trabalhos como Freelancer' }
       ];

       return {categories};
    }


}