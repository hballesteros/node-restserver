const { response } = require('express');
const { Categoria } = require('../models');

// obtenerCategorias - paginado - total - populate ( investigar en mongoose ) ultimo usuario que modifico la categoria

// obtenercategoria - populate

const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre, 
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);

}

// actualizarCategoria

// borrarcategoria ( cambiar estado a false )


module.exports = {
    crearCategoria
}