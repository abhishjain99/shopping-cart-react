import React, { Component } from "react";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="cart-wrapper">
          <ul></ul>
          <button className="checkout-btn">checkout</button>
        </div>
      </div>
    )
  }
}