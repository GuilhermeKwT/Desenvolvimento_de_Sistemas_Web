import Cliente from "./cliente";
import Endereco from "./endereco";
import Produto from "./produto";
import Telefone from "./telefone";
import Venda from "./venda";

var endereco : Endereco = new Endereco("Porto Rico", 54, "Guarapuava", "Paraná");
var telefone1 : Telefone = new Telefone("42", "36235674", "Fixo");
var telefone2 : Telefone = new Telefone("42", "999937576", "Celular");
var telefones : Telefone[] = new Array;
telefones[0] = telefone1;
telefones[1] = telefone2;

var cliente : Cliente = new Cliente("Guilherme", 12109096908, 20041208, "Masculino", endereco, telefones);

var produto1 : Produto = new Produto(1, "Óleo 20w50", 20);
var produto2 : Produto = new Produto(2, "Filtro de Óleo", 30);
var produtos : Produto[] = new Array;
produtos[0] = produto1;
produtos[1] = produto2;

var venda : Venda = new Venda(1, 20240328, cliente, produtos);

console.log(venda.calcularTotal());