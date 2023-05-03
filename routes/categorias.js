const { Router } = require('express')
const { check } = require('express-validator')
const { validarJWT, validarCampos } = require('../middlewares')
const { crearCategoria } = require('../controllers/categorias')

const router = Router()

/**
 *  {{url}}/api/categorias
 */

// Obtener todas las categorías - público
router.get('/', (req, res) => {
    res.json('get');
})

// Obtener una categoría por id - público
router.get('/:id',[
    check('id').custom( existeCategoria ) // deberia tirar error si no existe la categoria
],(req, res) => {
    res.json('get - id');
})

// Crear una categoría - privado - cualquiera con token válido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
    ], crearCategoria);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', (req, res) => {
    res.json('put');
})

// Borrar una categoría - Admin
router.delete('/:id', (req, res) => {
    res.json('delete');
})


module.exports = router