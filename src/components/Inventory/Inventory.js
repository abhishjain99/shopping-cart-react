import React, { Component } from "react";
import './inventory.css';

export default class Inventory extends Component {
  // handleUpdateAmount(target, action) {
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

  render() {
    const { inventory, handleUpdateAmount, handleAddToCart } = this.props;

    return (
      <div className="inventory-container">
        <h1>Inventory</h1>
        <ul>
          {inventory.map((item) => {
            return (
              <li id={`inventory-${item.id}`} key={item.id}>
                <div className="item-content"> {item.content} </div>

                <div className="item-controls">
                  <button
                    className="btn btn-minus"
                    onClick={() => handleUpdateAmount(item, "minus")}
                  > - </button>

                  <span
                    className="item-amount"
                  > { item.amount } </span>

                  <button
                    className="btn btn-plus"
                    onClick={() => handleUpdateAmount(item, "plus")}
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
        {/* <div className="pagination">
          <button className="pagination__btn pagination__btn-prev">
            {" "}
            {`<`}{" "}
          </button>
          <div className="pagination__page"></div>
          <button className="pagination__btn pagination__btn-next">
            {" "}
            {`>`}{" "}
          </button>
        </div> */}
      </div>
    );
  }
}
