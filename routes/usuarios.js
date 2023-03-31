const { Router } = require('express')
const { check } = require('express-validator')

const { esRoleValido, emailExiste } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios')

const router = Router()


router.get('/', usuariosGet )

router.put('/:id', usuariosPut )

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener mas de 6 caracteres').isLength(6),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom ( emailExiste ),
        check('rol').custom( esRoleValido ),
        validarCampos
] ,usuariosPost )

router.delete('/', usuariosDelete )

router.patch('/', usuariosPatch )


module.exports = router

