import React, { Component } from "react";
import Cart from '../Cart/Cart';
import Inventory from '../Inventory/Inventory';
import { getInventory, getCart, addToCart, updateCart, deleteFromCart, checkout } from "../../APIs/shoppingAPIs";

export default class Shopping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      filteredInventory: [],
      cart: [],
      currentInventoryPage: 0
    };
    this.itemsPerPage = 5;
    this.totalInventoryPages = 0;
  }

  async componentDidMount() {
    const inventoryData = await getInventory();
    const cartData = await getCart();
    this.totalInventoryPages = Math.ceil(inventoryData.length / this.itemsPerPage);
    const filteredInventoryData = inventoryData.slice(0, this.itemsPerPage);

    this.setState({
      inventory: inventoryData.map(item => { return {...item, amount: 0} }),
      cart: cartData || [],
      filteredInventory: filteredInventoryData.map(item => { return {...item, amount: 0} })
    });
  }

  handlePagination = (page, paginationFor="inventory") => {
    if(paginationFor === "inventory") {
      if(page >= 0 && page < this.totalInventoryPages) {
        const start = page * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        this.setState({
          filteredInventory: this.state.inventory.slice(start, end),
          currentInventoryPage: page,
        })
      }
      this.renderPageNumber(page);
    }
  }

  renderPageNumber = (currentPage) => {
    const currentId = `page-${currentPage}`;
    const numberButtons = document.querySelectorAll(".pagination__pagenum");

    numberButtons.forEach((button) => {
      if (button.id === currentId) {
        button.style.color = "red";
      } else {
        button.style.color = "black";
      }
    });

    if (currentPage === this.totalInventoryPages - 1) {
      document.querySelector(".pagination__btn-next").setAttribute("disabled", true);
      document.querySelector(".pagination__btn-prev").removeAttribute("disabled");
    } else if (currentPage === 0) {
      document.querySelector(".pagination__btn-prev").setAttribute("disabled", true);
      document.querySelector(".pagination__btn-next").removeAttribute("disabled");
    } else {
      document.querySelector(".pagination__btn-prev").removeAttribute("disabled");
      document.querySelector(".pagination__btn-next").removeAttribute("disabled");
    }
  }

  handleUpdateCart = (target, action) => {
    this.setState({
      filteredInventory: this.state.filteredInventory.map((item) => {
        return Number(item.id) === Number(target.id) ?
          action === "minus" ?
            item.amount !== 0 ?
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
          filteredInventory={this.state.filteredInventory}
          handlePagination={this.handlePagination}
          handleUpdateCart={this.handleUpdateCart}
          handleAddToCart={this.handleAddToCart}
          currentInventoryPage={this.state.currentInventoryPage}
          totalInventoryPages={this.totalInventoryPages}
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