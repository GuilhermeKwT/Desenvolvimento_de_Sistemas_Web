import Cliente from "./cliente";
import Produto from "./produto";

export default class Venda{
    private _codigo : number;
    private _data : number;
    private _cliente : Cliente;
    private _produtos : Produto[];

    constructor(codigo : number, data : number, cliente : Cliente, produtos : Produto[]){
        this._codigo = codigo;
        this._data = data;
        this._cliente = cliente;
        this._produtos = produtos;
    }

    get codigo() : number{
        return this._codigo;
    }

    get data() : number{
        return this._data;
    }

    get cliente() : Cliente{
        return this._cliente;
    }

    get produtos() : Produto[]{
        return this._produtos;
    }

    set codigo (codigo : number){
        this._codigo = codigo;
    }

    set data (data : number){
        this._data = data;
    }

    set cliente (cliente : Cliente){
        this._cliente = cliente;
    }

    set produtos (produtos : Produto[]){
        this._produtos = produtos;
    }

    calcularTotal() : number{
        let total = 0;
        this._produtos.forEach(produto => {
            total += produto.valor;
        });
        return total;
    }
}