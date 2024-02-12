import {MercadoPagoConfig, Payment} from 'mercadopago'


export const createOrder = async (req, res) => {
    const client = new MercadoPagoConfig({ accessToken: "TEST-2478045236701418-020611-c58c9b6bdf3fa717d5b33012fb1b8393-1669536117"
}
)

const payment = new Payment(client);

const body ={  
    transaction_amount: 12.34,
	description: "Point product for card payments via Bluetooth.",
	payment_method_id: "visa",
    payer: {
		email: 'ruiznahuelpatricio@gmail.com'
	},
}
    
payment.create({ body }).then(console.log).catch(console.log);
}