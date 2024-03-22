import React, { useState, useEffect } from "react";
import "../styles/Inventory.css";

const Row = ({ product, onEdit }) => (
  <tr className="row">
    <td className="cell">{`${product.plantvariety}, ${product.planttype}`}</td>
    <td className="cell">{product.seedcount}</td>
    <td className="cell cell-center">
      <button className="edit-button" onClick={() => onEdit(product)}>
        Edit
      </button>
    </td>
    <td className="cell cell-center">
      <button className="delete-button">Delete</button>
    </td>
  </tr>
);

const SingleProductView = ({ product, onSaveChanges, onClose }) => {
  const [editablePrice, setEditablePrice] = useState(product.price);
  const [editableSeedCount, setEditableSeedCount] = useState(product.seedcount);

  const handlePriceChange = (event) => {
    setEditablePrice(event.target.value);
  };

  const handleSeedCountChange = (event) => {
    setEditableSeedCount(event.target.value);
  };

  const saveChanges = () => {
    onSaveChanges(product.id, editablePrice, editableSeedCount);
  };


  //  Single Product Table
  return (
    <div className="product-details">
      <img className="product-image" src={product.imgurl} alt={`${product.plantvariety}`} />
      <div className="product-details-list">
        <h2>Variety: {product.plantvariety}</h2>
        <h2>Type: {product.planttype}</h2>
        <p>Current Price: ${product.price}</p>
        <p>Current Quantity: {product.seedcount}</p>
        <div className="price-change">
          <label>Price: $</label>
          <input type="number" value={editablePrice} onChange={handlePriceChange} />
        </div>
        <div className="seed-change">
          <label>Seed Count: </label>
          <input type="number" value={editableSeedCount} onChange={handleSeedCountChange} />
        </div>
        <button className="save-bttn" onClick={saveChanges}>Save</button>
        <button className="cancel-bttn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleSaveChanges = (id, price, seedCount) => {
    // saving logic here
    console.log("Saving changes for product", id, "with new price", price, "and new seed count", seedCount);
  };

  const handleClose = () => {
    setSelectedProduct(null); // This will close the details-container onClick 'close' button 
  };


  // Full Inventory Table 
  return (
    <div className="inventory-layout">
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
              <Row key={product.id} product={product} onEdit={handleEdit} />
            ))}
          </tbody>
        </table>
        <button className="add-new-product-btn">Add Product</button>
      </div>
      {selectedProduct && (
        <div className="details-container">
          <SingleProductView product={selectedProduct} onSaveChanges={handleSaveChanges} onClose={handleClose} />
        </div>
      )}
    </div>
  );
};

export default Inventory;
