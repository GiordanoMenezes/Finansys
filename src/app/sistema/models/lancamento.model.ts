import { Categoria } from './categoria.model';

export class Lancamento {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public tipo?: string,
        public valor?: number,
        public data?: string,
        public pago?: boolean,
        public categoria?: Categoria
    ) {

    }

    static types: Array<any> = [
        {value: 'REC', text: 'Receita'},
        {value: 'DESP', text: 'Despesa'}
    ];

    get pagoText() {
        return this.pago ? 'Pago' : 'Pendente';
    }
}
