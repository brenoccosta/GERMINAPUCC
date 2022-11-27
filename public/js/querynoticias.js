const querynoticias = (banco, listanoticias) => {
	banco.each('SELECT * FROM noticia', function (err, row) {
		let obj = {};

		for (att in row ) {
			obj[`${att}`] = row[`${att}`];
		}

		listanoticias.push(obj);
	});
}

module.exports = {querynoticias};