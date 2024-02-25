import { MercadoPagoConfig, Preference } from 'mercadopago'
import {MP_ACCESS_TOKEN, API_PAYMENTS_PREFIX, APP_PORT} from '../config.js'

const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });
const preference = new Preference(client);

export const add = async (products, buyer) => {
    try {
        const process = await preference.create({
            body: {
                items: products,
                payer: buyer,
              
                back_urls: {
                    success: `http://localhost:${APP_PORT}/${API_PAYMENTS_PREFIX}/success`,
                    failure: `http://localhost:${APP_PORT}/${API_PAYMENTS_PREFIX}/failure`,
                    pending: `http://localhost:${APP_PORT}/${API_PAYMENTS_PREFIX}/pending`,
                },
            }
        })

        return process
    } catch (err) {
        return err.message;
    }
}