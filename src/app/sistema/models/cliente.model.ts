export class Cliente {
    constructor(
        public id: number,
        public picture: string,
        public firstName: string,
        public lastName: string,
        public company: string,
        public email: string,
        public city: string
    ) { }

    public getDescricao(): string {
        return this.firstName + '' + this.lastName;
    }
}
