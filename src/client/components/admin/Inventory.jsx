import React, { useState, useEffect } from "react";
import "../styles/Inventory.css";

const Row = ({ variety, type, quantity }) => (
  <tr className="row">
    <td className="cell">{`${variety}, ${type}`}</td>
    <td className="cell">{quantity}</td>
    <td className="cell cell-center">
      <button className="edit-button">Edit</button>
    </td>
    <td className="cell cell-center">
      <button className="delete-button">Delete</button>
    </td>
  </tr>
);

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
          setProducts(result.products);
        } else {
          console.error("Error fetching products: ", response.statusText);
        }
      } catch (err) {
        console.error("Error fetching products: ", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="inventory-container">
      <table className="inventory-table">
        <thead>
          <tr className="header">
            <th className="cell">Name</th>
            <th className="cell">Quantity</th>
            <th className="cell">Edit</th>
            <th className="cell">Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <Row
              key={product.id}
              variety={product.plantvariety}
              type={product.planttype}
              quantity={product.seedcount}
            />
          ))}
        </tbody>
      </table>
      <button className="add-new-product-btn">Add New Product</button>
    </div>
  );
};

export default Inventory;
