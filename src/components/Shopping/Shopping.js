import React, { Component } from "react";
import Cart from '../Cart/Cart';
import Inventory from '../Inventory/Inventory';
import { getInventory, getCart, addToCart, updateCart, deleteFromCart, checkout } from "../../APIs/shoppingAPIs";

export default class Shopping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      cart: []
    };
  }

  async componentDidMount() {
    const inventoryData = await getInventory();
    const cartData = await getCart();
    this.setState({
      inventory: inventoryData.map(item => { return {...item, amount: 0} }),
      cart: cartData || []
    });
  }

  handleUpdateAmount = (target, action) => {
    this.setState({
      inventory: this.state.inventory.map((item) => {
        return Number(item.id) == Number(target.id) ?
          action === "minus" ?
            item.amount != 0 ?
              { ...item, amount: item.amount - 1 }
            : { ...item }
          : { ...item, amount: item.amount + 1 }
        : { ...item }
      })
    })
  }

  handleAddToCart = async (newItem) => {
    const itemExists = this.state.cart.find((item) => item.id === newItem.id);
    if(itemExists) {
      try {
        const newAmount = newItem.amount + itemExists.amount;
        await updateCart(newItem.id, { amount: newAmount } );
        this.setState({
          cart: this.state.cart.map((item) => {
            return item.id === newItem.id ?
              { ...item, amount: newAmount }
              : { ...item }
          })
        })
      } catch(err) {
        alert("Failed to update cart", err);
      }
    } else {
      if(newItem.amount !== 0) {
        try {
          await addToCart(newItem);
          this.setState({ cart: [...this.state.cart, newItem] });
        } catch(err) {
          alert("Failed to add to cart", err);
        }
      }
    }
  }

  handleDeleteFromCart = async (targetId) => {
    try {
      await deleteFromCart(targetId);
      this.setState({
        cart: this.state.cart.filter(item => targetId !== item.id)
      })
    } catch(err) {
      alert("Failed to delete items from cart", err);
    }
  }

  handleCheckout = async () => {
    try {
      await checkout();
      this.setState({
        cart: []
      })
    } catch(err) {
      alert("Falied to checkout", err);
    }
  }

  render() {
    return (
      <div className="appContainer">
        <Inventory
          inventory={this.state.inventory}
          handleUpdateAmount={this.handleUpdateAmount}
          handleAddToCart={this.handleAddToCart}
        />
        <Cart
          cart={this.state.cart}
          handleDeleteFromCart={this.handleDeleteFromCart}
          handleCheckout={this.handleCheckout}
        />
      </div>
    )
  }
}