import { Router } from 'express'
import { add } from '../controllers/paymentController.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const products = [ { title: 'Producto1', quantity: 1, unit_price: 600 } ]
        const buyer = { email: 'test_user_484663267@testuser.com' }
        const process = await add(products, buyer)
        console.log(process)
        res.redirect(process.sandbox_init_point)
    } catch (err) {
        res.status(500).send({ status: -1, data: 'Error al gestionar el pago' })
    }
})

router.get('/success', (req, res) => {
    res.status(200).send({ status: 1, data: 'El pago ha sido procesado, muchas gracias por tu compra!' })
})

router.get('/failure', (req, res) => {
    res.status(200).send({ status: -1, data: 'Hubo un error al procesar el pago, por favor reintente o pónganse en contacto con nosotros' })
})

router.get('/pending', (req, res) => {
    res.status(200).send({ status: -1, data: 'El pago ha sido procesado pero aún está pendiente de confirmación' })
})

export default router