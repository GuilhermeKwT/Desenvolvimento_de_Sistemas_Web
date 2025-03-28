export default class Telefone{
    private _ddd : string;
    private _numero : string;
    private _tipo : string;

    constructor(ddd : string, numero : string, tipo : string){
        this._ddd = ddd;
        this._numero = numero;
        this._tipo = tipo;
    }

    get ddd() : string{
        return this._ddd;
    }
    
    get numero() : string{
        return this._numero;
    }

    get tipo() : string{
        return this._tipo;
    }

    set ddd (ddd : string){
        this._ddd = ddd;
    }

    set numero (numero : string){
        this._numero = numero;
    }

    set tipo (tipo : string){
        this._tipo = tipo;
    }
}