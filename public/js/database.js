// https://github.com/TryGhost/node-sqlite3/wiki/API

// Importando o pacote para o manuseio do sqlite3
const sqlite3 = require('sqlite3');

// A função database aceita um ou mais modos de abrir uma base
// sqlite3.OPEN_READONLY: abre a base de dados apenas para leitura
// sqlite3.OPEN_READWRITE : abre a base de dados para leitura e escrita
// sqlite3.OPEN_CREATE: abre a base de dados, caso ela não exista, cria ela.
// Como padrão a função Database usa sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
let db = new sqlite3.Database('../../germina.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
	console.log('Conectado a base de dados');
});

// Criação das tabelas
const tblNoticia = `
CREATE TABLE IF NOT EXISTS "noticia" (
	"idNoticia"	INTEGER NOT NULL,
	"titulo"	TEXT NOT NULL,
	"data"	TEXT NOT NULL,
	"autor"	TEXT,
	"conteudo" TEXT,
	"imagem" TEXT,
	PRIMARY KEY("idNoticia")
);`;

const tblTag = `
CREATE TABLE IF NOT EXISTS "tag" (
	"idTag"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	PRIMARY KEY("idTag")
);`;

const tblNoticiaTag = `
CREATE TABLE IF NOT EXISTS "noticia_tag" (
	"idNoticia"	INTEGER NOT NULL,
	"idTag"	INTEGER NOT NULL,
	FOREIGN KEY("idNoticia") REFERENCES "noticia"("idNoticia"),
	FOREIGN KEY("idTag") REFERENCES "tag"("idTag"),
	PRIMARY KEY(idNoticia, idTag)
);`;

const tblTipo = `
CREATE TABLE IF NOT EXISTS "tipo" (
	"idTipo"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	PRIMARY KEY("idTipo")
);`;

const tblProduto = `
CREATE TABLE IF NOT EXISTS "produto" (
	"idProduto"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"tipo"	INTEGER,
	"Descricao" TEXT,
	"imagem" TEXT,
	PRIMARY KEY("idProduto"),
	FOREIGN KEY("tipo") REFERENCES "tipo"("idTipo")
);`;

const tblPreco = `
CREATE TABLE IF NOT EXISTS "preco" (
	"idPreco"	INTEGER NOT NULL,
	"data"	TEXT NOT NULL,
	"valorReal"	REAL NOT NULL,
	"variacaoDiaria"	REAL,
	"variacaoMensal"	REAL,
	"produto"	INTEGER NOT NULL,
	PRIMARY KEY("idPreco"),
	FOREIGN KEY("produto") REFERENCES "produto"("idProduto")
);`;


const tblUsuario = `
CREATE TABLE IF NOT EXISTS "usuario" (
	"idUsuario"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"sobrenome" TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	"salt"	TEXT NOT NULL UNIQUE,
	"email"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("idUsuario")
);`;

const tblUsuarioNoticia = `
CREATE TABLE IF NOT EXISTS "usuario_noticia" (
	"idUsuario"	INTEGER NOT NULL UNIQUE,
	"idNoticia"	INTEGER NOT NULL UNIQUE,
	FOREIGN KEY("idNoticia") REFERENCES "noticia"("idNoticia"),
	FOREIGN KEY("idUsuario") REFERENCES "usuario"("idUsuario")
);`;

const tabelas = [tblNoticia,tblTag,tblNoticiaTag,tblTipo,tblProduto,tblPreco,tblUsuario,tblUsuarioNoticia];

for (let i=0; i<tabelas.length;i++){
	db.run(tabelas[i], function(err){
		if (err) {
			return console.log(err.message);
		}
		console.log(`Tabela ${i+1} criada com sucesso!`);
	});
}

// Fechar conexão com base de dados
db.close();