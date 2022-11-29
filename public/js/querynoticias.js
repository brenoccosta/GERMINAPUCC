const querynoticias = (banco, listanoticias) => {
	banco.each('SELECT * FROM noticia', function (err, row) {
		let obj = {};

		for (att in row ) {
			obj[`${att}`] = row[`${att}`];
		}

		listanoticias.push(obj);
	});
}

const querysinglenoticia = (banco, id, teste) => {
	banco.get(`SELECT * FROM noticia WHERE idNoticia = ?`, [id], (err, row) => {
		let obj = {};
		console.log(row);

		for (let att in row) {
			obj[`${att}`] = row[`${att}`];
		}

		teste.push(obj);
	})
}

module.exports = {querynoticias, querysinglenoticia};