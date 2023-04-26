import React from 'react';
import './ShoppingCart.css';

function ShoppingCart(props) {
  return (
    <div>
      <h2>Carrito de la compra</h2>
      {props.cart && props.cart.length === 0 ? (
        <p className='rojo'>El carrito de compras está vacío</p>
      ) : (
        <ul>
          {props.cart.map((product, index) => (
            <li key={index}>
              {product.name}: {product.price}€
              <button className='del' onClick={() => props.removeFromCart(index)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShoppingCart;
