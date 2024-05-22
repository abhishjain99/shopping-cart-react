import React, { Component } from "react";
import "./cart.css";

export default class Cart extends Component {
  render() {
    const { cart, handleDeleteFromCart, handleCheckout } = this.props;
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="cart-wrapper">
          <ul>{
            cart.map((item) => {
              return (
                <li id={`cart-${item.id}`} key={item.id}>
                  <span className="item-content"> {item.content} x {item.amount} </span>
                  <button className="btn btn-delete" onClick={() => handleDeleteFromCart(item.id)}> delete </button>
                </li>
              );
            })
          }</ul>
          <button className="checkout-btn" onClick={() => handleCheckout()}> checkout </button>
        </div>
      </div>
    )
  }
}