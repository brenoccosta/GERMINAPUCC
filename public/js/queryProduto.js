const queryProdutos = (banco, listaProdutos) => {
	banco.each('SELECT idProduto, nome, descricao, tipo, path_img FROM produto', function ( err, row ) {
		let obj = {};

		for( att in row ) {
			obj[`${att}`] = row[`${att}`];
		}

		obj['precos'] = new Array();
		listaProdutos.push(obj);
	});
	

	banco.each('SELECT * FROM preco', function ( err, row ) {
		for (let produto of listaProdutos) {
			if(row.produto == produto.idProduto) {
				produto['precos'].push(row);
			}
		}
	});
}

module.exports = {queryProdutos};