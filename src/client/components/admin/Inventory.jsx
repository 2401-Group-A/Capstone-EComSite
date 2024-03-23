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

  const handlePriceChange = (event) => {
    setEditablePrice(event.target.value);
  };

  const saveChanges = () => {
    onSaveChanges(product.id, editablePrice);
  };

  return (
    <div className="product-details">
      <img
        className="product-image"
        src={product.imgurl}
        alt={`${product.plantvariety}`}
      />
      <div className="product-details-list">
        <h2>Variety: {product.plantvariety}</h2>
        <h2>Type: {product.planttype}</h2>
        <p>Current Price: ${product.price}</p>
        <div className="price-change">
          <label>Edit Price: $</label>
          <input
            type="number"
            value={editablePrice}
            onChange={handlePriceChange}
          />
        </div>
        <button className="save-bttn" onClick={saveChanges}>
          Save
        </button>
        <button className="cancel-bttn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// Full Inventory Function
const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // States for new product attributes
  const [newPlantType, setNewPlantType] = useState("");
  const [newPlantVariety, setNewPlantVariety] = useState("");
  const [newProduceType, setNewProduceType] = useState("");
  const [newMatureHeight, setNewMatureHeight] = useState("");
  const [newMatureWidth, setNewMatureWidth] = useState("");
  const [newPlantSpacing, setNewPlantSpacing] = useState("");
  const [newPlantingDepth, setNewPlantingDepth] = useState("");
  const [newMaturationTime, setNewMaturationTime] = useState("");
  const [newLightRequirements, setNewLightRequirements] = useState("");
  const [newImgUrl, setNewImgUrl] = useState("");
  const [newSeedCount, setNewSeedCount] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newPlantDescription, setNewPlantDescription] = useState("");
  const [newPlantingInstructions, setNewPlantingInstructions] = useState("");
  // End of new product states

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
    // API call to save changes here
  };

  const handleClose = () => {
    setSelectedProduct(null); // Close the product edit view
  };

  const handleAddNewProduct = async () => {
    // New Product data
    const newProductData = {
      plantType: newPlantType,
      plantVariety: newPlantVariety,
      produceType: newProduceType,
      matureHeight: newMatureHeight,
      matureWidth: newMatureWidth,
      plantSpacing: newPlantSpacing,
      plantingDepth: newPlantingDepth,
      maturationTime: newMaturationTime,
      lightRequirements: newLightRequirements,
      imgUrl: newImgUrl,
      seedCount: newSeedCount,
      price: newPrice,
      plantDescription: newPlantDescription,
      plantingInstructions: newPlantingInstructions,
    };

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductData),
      });

      if (!response.ok) {
        throw new Error("Failed to add new product");
      }
      await fetchProducts();
      setShowAddForm(false); // Hides form after successful submission
    } catch (error) {
      console.error("Error adding new product:", error);
    }
  };

  // Inventory Container
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
        <button
          className="add-new-product-btn"
          onClick={() => setShowAddForm(true)}
        >
          Add Product
        </button>
      </div>

      {showAddForm && (
        <div className="product-add">
          <h2>Add New Product</h2>
          <div className="product-add-list">
            {/* Example input for new plant type */}
            <div className="input-change">
              <label>Plant Type:</label>
              <select
                value={newPlantType}
                onChange={(e) => setNewPlantType(e.target.value)}
              >
                <option value="Basil">Basil</option>
                <option value="Cilantro">Cilantro</option>
                <option value="Mint">Mint</option>
                <option value="Oregano">Oregano</option>
                <option value="Parsley">Parsley</option>
                <option value="Spinach">Spinach</option>
                <option value="Arugula">Arugula</option>
                <option value="Pea">Pea</option>
                <option value="Lettuce">Lettuce</option>
                <option value="Cabbage">Cabbage</option>
                <option value="Radish">Radish</option>
                <option value="Tomato">Tomato</option>
                <option value="Pepper">Pepper</option>
                <option value="Cucumber">Cucumber</option>
                <option value="Onion">Onion</option>
                <option value="Zucchini">Zucchini</option>
                <option value="Bean">Bean</option>
                <option value="Carrot">Carrot</option>
              </select>
            </div>
            <div className="input-change">
              <label>Plant Variety:</label>
              <input
                type="text"
                value={newPlantVariety}
                onChange={(e) => setNewPlantVariety(e.target.value)}
              />
            </div>
            <div className="input-change">
              <label>Produce Type:</label>
              <input
                type="text"
                value={newProduceType}
                onChange={(e) => setNewProduceType(e.target.value)}
              />
            </div>
            <div className="input-change">
              <label>Mature Height:</label>
              <input
                type="text"
                value={newMatureHeight}
                onChange={(e) => setNewMatureHeight(e.target.value)}
              />
            </div>
            <div className="input-change">
              <label>Mature Width:</label>
              <input
                type="text"
                value={newMatureWidth}
                onChange={(e) => setNewMatureWidth(e.target.value)}
              />
            </div>
            <div className="input-change">
              <label>Plant Spacing:</label>
              <input
                type="text"
                value={newPlantSpacing}
                onChange={(e) => setNewPlantSpacing(e.target.value)}
              />
            </div>
            <div className="input-change">
              <label>Planting Depth:</label>
              <input
                type="text"
                value={newPlantingDepth}
                onChange={(e) => setNewPlantingDepth(e.target.value)}
              />
            </div>
            <div className="input-change">
              <label>Maturation Time:</label>
              <input
                type="text"
                value={newMaturationTime}
                onChange={(e) => setNewMaturationTime(e.target.value)}
              />
            </div>
            <div className="input-change">
              <label>Light Requirements:</label>
              <input
                type="text"
                value={newLightRequirements}
                onChange={(e) => setNewLightRequirements(e.target.value)}
              />
            </div>
            <div className="input-change">
              <label>Image URL:</label>
              <input
                type="text"
                value={newImgUrl}
                onChange={(e) => setNewImgUrl(e.target.value)}
              />
            </div>
            <div className="input-change">
              <label>Seed Count:</label>
              <input
                type="number"
                value={newSeedCount}
                onChange={(e) => setNewSeedCount(e.target.value)}
              />
            </div>
            <div className="input-change">
              <label>Price:</label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </div>
            <div className="input-change">
              <label>Plant Description:</label>
              <textarea
                value={newPlantDescription}
                onChange={(e) => setNewPlantDescription(e.target.value)}
              />
            </div>
            <div className="input-change">
              <label>Planting Instructions:</label>
              <textarea
                value={newPlantingInstructions}
                onChange={(e) => setNewPlantingInstructions(e.target.value)}
              />
            </div>

            {/* End of inputs */}

            <button className="save-bttn" onClick={handleAddNewProduct}>
              Save
            </button>
            <button
              className="cancel-bttn"
              onClick={() => setShowAddForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="details-container">
          <SingleProductView
            product={selectedProduct}
            onSaveChanges={handleSaveChanges}
            onClose={handleClose}
          />
        </div>
      )}
    </div>
  );
};

export default Inventory;
