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

// Single Products Function
const SingleProductView = ({ product, onSaveChanges, onClose }) => {
  const [editablePrice, setEditablePrice] = useState(product.price);

  const handlePriceChange = (event) => {
    setEditablePrice(event.target.value);
  };

  const saveChanges = () => {
    onSaveChanges(product.id, editablePrice);
  };

// ON EDIT CONTAINER 
  return (
    <div className="product-details">
      <img className="product-image" src={product.imgurl} alt={`${product.plantvariety}`} />
      <div className="product-details-list">
        <h2>Variety: {product.plantvariety}</h2>
        <h2>Type: {product.planttype}</h2>
        <p>Current Price: ${product.price}</p>
        <div className="price-change">
          <label>Edit Price: $</label>
          <input type="number" value={editablePrice} onChange={handlePriceChange} />
        </div>
        <button className="save-bttn" onClick={saveChanges}>Save</button>
        <button className="cancel-bttn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};


// Full Inventory Function
const Inventory = () => {
  const [products, setProducts] = useState([]);
  // Edit Products const
  const [selectedProduct, setSelectedProduct] = useState(null);
  // New product const
  const [showAddForm, setShowAddForm] = useState(false);

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

  const handleSaveChanges = (id, price) => {
    console.log("Saving changes for product", id, "with new price", price);
    // Include your API call here to save the new price to the database
  };

  const handleClose = () => {
    setSelectedProduct(null); // This will close the details-container
  };



// Full Inventory of Products Container
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
        <button className="add-new-product-btn" onClick={() => setShowAddForm(true)}>Add Product</button>
      </div>

      {showAddForm && (
  <div className="add-details">
    <h2>Add New Product</h2>
    <div className="price-change">
      <label>Plant Type:</label>
      <input type="text" /* Setup state and onChange handler for each field */ />
      {/* Repeat for other product attributes like plantvariety, producttype, etc. */}
    </div>
    <button className="save-bttn" /* onClick handler to submit new product */>Save</button>
    <button className="cancel-bttn" onClick={() => setShowAddForm(false)}>Close</button>
  </div>
)}
      {/* ------------Single Product View Edit bttn */}
      {selectedProduct && (
        <div className="details-container">
          <SingleProductView product={selectedProduct} onSaveChanges={handleSaveChanges} onClose={handleClose} />
        </div>
      )}
    </div>
  );
};

export default Inventory;
