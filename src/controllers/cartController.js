import User from "../models/users.models.js";
import mongoose from "mongoose";
import products from "../models/products.models.js";

export const addProductCart = (req, res) => {
  if (req.user && req.user.id) {
    const userId = req.user.id;
    console.log("req.body:", req.body);
    if (!req.body || !req.body.id) {
      return res
        .status(400)
        .json({ error: "Missing product ID in the request body" });
    }

    const {
      id: { id: productId, quantity },
    } = req.body;
    console.log("productId:", productId);
    console.log("quantity:", quantity);

    if (quantity === undefined) {
      return res
        .status(400)
        .json({ error: "Missing quantity in the request body" });
    }

    const objectIdProductId = mongoose.Types.ObjectId(productId);

    User.findById(userId, (err, user) => {
      if (err) return res.status(500).send(err);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const cartItem = user.cart.find(
        (item) =>
          item &&
          item._id &&
          item._id.toString() === objectIdProductId.toString()
      );
      // ...
      if (!cartItem) {
        const newCartItem = { _id: productId, quantity };
        user.cart.push(newCartItem);
      } else {
        // Verifica que tanto cartItem.quantity como quantity sean números antes de sumar
        if (!isNaN(cartItem.quantity) && !isNaN(quantity)) {
          cartItem.quantity += quantity;
        } else {
          console.error(
            `La cantidad existente (${cartItem.quantity}) o la nueva cantidad (${quantity}) no son números válidos.`
          );
          return res
            .status(400)
            .send(
              `Error: La cantidad existente o la nueva cantidad no son números válidos. Cantidad existente: ${cartItem.quantity}, Nueva cantidad: ${quantity}`
            );
        }
      }
      // ...

      user.save((err, updatedUser) => {
        if (err) {
          console.error("Error al guardar cambios en el usuario:", err);
          return res
            .status(500)
            .send("Error al guardar cambios en el usuario.");
        }

        if (!updatedUser) {
          console.error(
            "No se pudo obtener el usuario actualizado después de guardar."
          );
          return res
            .status(500)
            .send(
              "Error al obtener el usuario actualizado después de guardar."
            );
        }

        console.log("Usuario actualizado:", updatedUser);

        const updatedCartItem = updatedUser.cart.find(
          (item) =>
            item &&
            item._id &&
            item._id.toString() === objectIdProductId.toString()
        );

        if (!updatedCartItem) {
          console.error(
            `El producto con ID ${productId} no se encontró en el carrito después de la actualización.`
          );
          return res
            .status(404)
            .send(
              "Producto no encontrado en el carrito después de la actualización."
            );
        }

        console.log("Carrito actualizado:", updatedUser.cart);
        res.send(updatedCartItem); // Devuelve el elemento de carrito actualizado
      });
    });
  } else {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }
};

export const updateQuantityResta = (req, res) => {
  if (req.user && req.user.id) {
    const userId = req.user.id;
    console.log("req.body:", req);
    if (!req.body || !req.body.id) {
      return res
        .status(400)
        .json({ error: "Missing product ID in the request body" });
    }

    const { id: productId, quantity } = req.body;
    console.log("productId:", productId);
    console.log("quantity:", quantity);

    if (quantity === undefined) {
      return res
        .status(400)
        .json({ error: "Missing quantity in the request body" });
    }

    const objectIdProductId = mongoose.Types.ObjectId(productId);

    User.findById(userId, (err, user) => {
      if (err) return res.status(500).send(err);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const cartItem = user.cart.find(
        (item) =>
          item &&
          item._id &&
          item._id.toString() === objectIdProductId.toString()
      );
      // ...
      if (!cartItem) {
        const newCartItem = { _id: productId, quantity };
        user.cart.push(newCartItem);
      } else {
        // Verifica que tanto cartItem.quantity como quantity sean números antes de sumar
        if (!isNaN(cartItem.quantity) && !isNaN(quantity)) {
          cartItem.quantity -= quantity;
        } else {
          console.error(
            `La cantidad existente (${cartItem.quantity}) o la nueva cantidad (${quantity}) no son números válidos.`
          );
          return res
            .status(400)
            .send(
              `Error: La cantidad existente o la nueva cantidad no son números válidos. Cantidad existente: ${cartItem.quantity}, Nueva cantidad: ${quantity}`
            );
        }
      }
      // ...

      user.save((err, updatedUser) => {
        if (err) {
          console.error("Error al guardar cambios en el usuario:", err);
          return res
            .status(500)
            .send("Error al guardar cambios en el usuario.");
        }

        if (!updatedUser) {
          console.error(
            "No se pudo obtener el usuario actualizado después de guardar."
          );
          return res
            .status(500)
            .send(
              "Error al obtener el usuario actualizado después de guardar."
            );
        }

        console.log("Usuario actualizado:", updatedUser);

        const updatedCartItem = updatedUser.cart.find(
          (item) =>
            item &&
            item._id &&
            item._id.toString() === objectIdProductId.toString()
        );

        if (!updatedCartItem) {
          console.error(
            `El producto con ID ${productId} no se encontró en el carrito después de la actualización.`
          );
          return res
            .status(404)
            .send(
              "Producto no encontrado en el carrito después de la actualización."
            );
        }

        console.log("Carrito actualizado:", updatedUser.cart);
        res.send(updatedCartItem); // Devuelve el elemento de carrito actualizado
      });
    });
  } else {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }
};


export const updateQuantity = (req, res) => {
  if (req.user && req.user.id) {
    const userId = req.user.id;
    console.log("req.body:", req);
    if (!req.body || !req.body.id) {
      return res
        .status(400)
        .json({ error: "Missing product ID in the request body" });
    }

    const { id: productId, quantity } = req.body;
    console.log("productId:", productId);
    console.log("quantity:", quantity);

    if (quantity === undefined) {
      return res
        .status(400)
        .json({ error: "Missing quantity in the request body" });
    }

    const objectIdProductId = mongoose.Types.ObjectId(productId);

    User.findById(userId, (err, user) => {
      if (err) return res.status(500).send(err);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const cartItem = user.cart.find(
        (item) =>
          item &&
          item._id &&
          item._id.toString() === objectIdProductId.toString()
      );
      // ...
      if (!cartItem) {
        const newCartItem = { _id: productId, quantity };
        user.cart.push(newCartItem);
      } else {
        // Verifica que tanto cartItem.quantity como quantity sean números antes de sumar
        if (!isNaN(cartItem.quantity) && !isNaN(quantity)) {
          cartItem.quantity += quantity;
        } else {
          console.error(
            `La cantidad existente (${cartItem.quantity}) o la nueva cantidad (${quantity}) no son números válidos.`
          );
          return res
            .status(400)
            .send(
              `Error: La cantidad existente o la nueva cantidad no son números válidos. Cantidad existente: ${cartItem.quantity}, Nueva cantidad: ${quantity}`
            );
        }
      }
      // ...

      user.save((err, updatedUser) => {
        if (err) {
          console.error("Error al guardar cambios en el usuario:", err);
          return res
            .status(500)
            .send("Error al guardar cambios en el usuario.");
        }

        if (!updatedUser) {
          console.error(
            "No se pudo obtener el usuario actualizado después de guardar."
          );
          return res
            .status(500)
            .send(
              "Error al obtener el usuario actualizado después de guardar."
            );
        }

        console.log("Usuario actualizado:", updatedUser);

        const updatedCartItem = updatedUser.cart.find(
          (item) =>
            item &&
            item._id &&
            item._id.toString() === objectIdProductId.toString()
        );

        if (!updatedCartItem) {
          console.error(
            `El producto con ID ${productId} no se encontró en el carrito después de la actualización.`
          );
          return res
            .status(404)
            .send(
              "Producto no encontrado en el carrito después de la actualización."
            );
        }

        console.log("Carrito actualizado:", updatedUser.cart);
        res.send(updatedCartItem); // Devuelve el elemento de carrito actualizado
      });
    });
  } else {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }
};

export const getProductscart = async (req, res) => {
  try {
    const { user } = req;

    // Verificar si el usuario existe y tiene un carrito
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Obtener detalles de productos para cada ítem en el carrito
    const populatedCart = await Promise.all(
      user.cart.map(async (cartItem) => {
        const productDetails = await products.findById(cartItem._id);
        return {
          ...cartItem.toObject(),
          product: productDetails,
        };
      })
    );

    // Asignar el carrito poblado al usuario
    user.cart = populatedCart;

    // Verificar si el carrito está presente después de la población
    if (!user.cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.json({ cart: user.cart });
  } catch (error) {
    console.log("Error en getProductscart:", error);
    res.status(500).json({ error: error.message });
  }
};

export const removeProductCart = (req, res) => {
  if (req.user && req.user.id) {
    const userId = req.user.id;
    console.log("params:", req.params);
    const productId = req.params.productId;

    const quantityToRemove = req.body.quantity || 1; // La cantidad predeterminada es 1 si no se proporciona en el cuerpo
    console.log(productId, quantityToRemove);
    // Encuentra el usuario por su ID
    User.findById(userId, (err, user) => {
      if (err) return res.status(500).send(err);

      // Busca el índice del producto en el carrito
      const cartIndex = user.cart.findIndex(
        (item) => item._id.toString() === productId
      );

      console.log("Cart:", user.cart);
      console.log("Product ID:", productId);
      console.log("Cart Index:", cartIndex);
      // Verifica si el producto está en el carrito
      if (cartIndex === -1) {
        return res.status(404).json({ error: "Product not found in the cart" });
      }

      // Reduzca la cantidad del producto en el carrito
      // const cartItem = user.cart[cartIndex];
      //   cartItem.quantity = Math.max(0, cartItem.quantity - quantityToRemove);

      // Elimine el producto del carrito si la cantidad es cero
      // if (cartItem.quantity === 0) {
      user.cart.splice(cartIndex, 1);
      //}

      // Guarda los cambios en el modelo de usuario
      user.save((err, updatedUser) => {
        if (err) return res.status(500).send(err);
        res.send({
          message: "Product quantity updated in the cart",
          cart: updatedUser.cart,
        });
      });
    });
  } else {
    return res.status(401).json({ error: "User not authenticated" });
  }
};

export const cleanCart = async (req, res) => {
  try {
    console.log('user', User)
    // Lógica para limpiar el carrito en el modelo de usuario
    await User.updateMany({}, { cart: [] }); // Actualiza todos los documentos de usuario para establecer el carrito como un array vacío

    res.status(204).end(); // 204 No Content para indicar éxito sin contenido
  } catch (error) {
    console.error('Error al limpiar el carrito en el modelo de usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }

}