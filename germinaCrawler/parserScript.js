const htmlparser = require('node-html-parser');
const ejs = require('ejs');

let lista_itens = ['boi-gordo', 'acucar', 'arroz', 'bezerro', 'cafe', 'milho', 'soja', 'trigo'];
let arquivo, root, result;

for (let item of lista_itens){
    arquivo = ejs.fileLoader(`germinaCrawler/src/output_${item}.html`).toString();
    root = htmlparser.parse(arquivo);
    result = root.getElementsByTagName('table');

    let tabela = [];
    for(let w = 1; w <= 29; w += 2){
        let instance = {};
        for(let z = 1; z <= 9; z +=2){
            if (z === 1){ 
                instance['data'] = result[0].childNodes[3].childNodes[w].childNodes[z].text;
                continue;
            } else {
                instance[`${result[0].childNodes[1].childNodes[1].childNodes[z].text}`] = result[0].childNodes[3].childNodes[w].childNodes[z].text;
            }
        }
        tabela.push(instance);
    }
    tabela.map(inst => console.table(inst));
}