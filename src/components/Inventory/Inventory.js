import React, { Component } from "react";
import './inventory.css';

export default class Inventory extends Component {
  // handleUpdateCart(target, action) {
  //   this.setState({
  //     inventory: this.props.inventory.map((item) => {
  //       console.log(item.id == target.id);
  //       return item.id == target.id ?
  //         action === "minus" ?
  //           item.amount != 0 ?
  //             { ...item, amount: item.amount - 1 }
  //           : { ...item }
  //         : { ...item, amount: item.amount + 1 }
  //       : { ...item }
  //     })
  //   })
  // }
  // Not possible as state can be passed from parent to child and not vice versa. So need to use callback or have this function in parent and send it from there as a prop (May 21st, 2024)

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentInventoryPage: 0
  //   }
  //   this.itemsPerPage = 5;
  //   this.totalInventoryPages = 0;
  // }

  render() {
    const { filteredInventory, handlePagination, handleUpdateCart, handleAddToCart, currentInventoryPage, totalInventoryPages } = this.props;

    function renderPagination() {
      let paginationButtons = [];
      for(let i = 0; i < totalInventoryPages; i++) {
        let button = <button
          key={`page-${i}`}
          id={`page-${i}`}
          className="pagination__pagenum"
          onClick={() => handlePagination(i)} > {i + 1} </button>
        paginationButtons.push(button);
      }
      return paginationButtons;
    }

    return (
      <div className="inventory-container">
        <h1>Inventory</h1>
        <ul>
          {filteredInventory.map((item) => {
            return (
              <li id={`inventory-${item.id}`} key={item.id}>
                <div className="item-content"> {item.content} </div>

                <div className="item-controls">
                  <button
                    className="btn btn-minus"
                    onClick={() => handleUpdateCart(item, "minus")}
                  > - </button>

                  <span
                    className="item-amount"
                  > { item.amount } </span>

                  <button
                    className="btn btn-plus"
                    onClick={() => handleUpdateCart(item, "plus")}
                  > + </button>

                  <button
                    className="btn btn-info btn-add-to-cart"
                    onClick={() => handleAddToCart(item)}
                  > add to cart </button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="pagination">
          <button className="pagination__btn pagination__btn-prev" onClick={() => handlePagination(currentInventoryPage - 1)}> {`<`} </button>
          <div className="pagination__page">{ renderPagination() }</div>
          <button className="pagination__btn pagination__btn-next" onClick={() => handlePagination(currentInventoryPage + 1)}> {`>`} </button>
        </div>
      </div>
    );
  }
}
