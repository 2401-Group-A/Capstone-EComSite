import React, { useState, useEffect } from "react";
import "../styles/Inventory.css";

const DEFAULT_IMAGE_URL = "src/client/assets/plants/placeholder.jpg";

const Row = ({ product, onEdit, onDelete }) => (
  <tr className="row">
    <td className="cell">{`${product.plantvariety}, ${product.planttype}`}</td>
    <td className="cell">{product.seedcount}</td>
    <td className="cell cell-center">
      <button className="edit-button" onClick={() => onEdit(product)}>
        Edit
      </button>
    </td>
    <td className="cell cell-center">
      <button className="delete-button" onClick={() => onDelete(product.id)}>
        Delete
      </button>
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
const Inventory = ({token}) => {
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
  // Is New Product Form Complete?
  const isFormComplete =
    newPlantType &&
    newPlantVariety &&
    newProduceType &&
    newMatureHeight &&
    newMatureWidth &&
    newPlantSpacing &&
    newPlantingDepth &&
    newMaturationTime &&
    newLightRequirements &&
    newImgUrl &&
    newSeedCount &&
    newPrice &&
    newPlantDescription &&
    newPlantingInstructions;

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
  useEffect(() => {
    fetchProducts();
  }, []);
// Admin Check
const adminCheck = async () => {
  console.log(token);
  try {
    const isAdmin = await fetch('http://localhost:3000/api/users/admin', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (isAdmin.ok) {
      const admin = await isAdmin.json();
      console.log(admin);
      if (admin.admin != true ) {
        navigate("/login");
      }
    } else {
      console.error("Error fetching products: ", response.statusText);
    }
  } catch (err) {
    next(err);
  }
};

useEffect(() => {
  if (token) {
    adminCheck();
}

fetchProducts();
}, [token]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleSaveChanges = async (productId, newPrice) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price: newPrice }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product price");
      }
      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          return { ...product, price: newPrice };
        }
        return product;
      });
      setProducts(updatedProducts);

      // Close the edit view
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleClose = () => {
    setSelectedProduct(null); // Close the product edit view
  };

  // Delete a Product
  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) {
      return; // Early return if the user cancels the confirmation
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Refresh the products list after deletion
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Add New Product
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
      imgUrl: newImgUrl || DEFAULT_IMAGE_URL, // Uses default img const at top
      seedCount: newSeedCount,
      price: newPrice,
      plantDescription: newPlantDescription,
      plantingInstructions: newPlantingInstructions,
    };

    console.log("Test stuff", handleAddNewProduct);
    try {
      const response = await fetch(
        "http://localhost:3000/api/products/addproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProductData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add new product");
      }
      await fetchProducts();
      setShowAddForm(false); // Hides form after successful submission
    } catch (error) {
      console.error("Error adding new product:", error);
    }
  };
// Conditional Redendering
if (!token) {
  console.log("here");
  return <div>Please log in</div>
}
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
              <Row
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDeleteProduct}
              />
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

      {/* Add product container and inputs */}

      {showAddForm && (
        <div className="product-add">
          <h2>Add New Product</h2>
          <div className="product-add-list">
            <div className="input-change">
              <label>Plant Type:</label>
              <select
                value={newPlantType}
                onChange={(e) => setNewPlantType(e.target.value)}
              >
                <option value="" disabled>
                  Plant Type
                </option>
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
              <select
                value={newProduceType}
                onChange={(e) => setNewProduceType(e.target.value)}
              >
                <option value="" disabled>
                  Produce Type
                </option>
                <option value="Herb">Herb</option>
                <option value="Vegetable">Vegetable</option>
              </select>
            </div>
            <div className="input-change">
              <label>Mature Height:</label>
              <select
                value={newMatureHeight}
                onChange={(e) => setNewMatureHeight(e.target.value)}
              >
                <option value="" disabled>
                  Mature Height
                </option>
                <option value="6-8 inches">6-8 inches</option>
                <option value="8-12 inches">8-12 inches</option>
                <option value="12-18 inches">12-18 inches</option>
                <option value="18-24 inches">18-24 inches</option>
                <option value="24-30 inches">24-30 inches</option>
                <option value="24-36 inches">24-36 inches</option>
                <option value="24-36 inches (vining)">
                  24-36 inches (vining)
                </option>
                <option value="48-60 inches">48-60 inches</option>
                <option value="48-72 inches">48-72 inches</option>
                <option value="18-24 inches (bush)">18-24 inches (bush)</option>
              </select>
            </div>
            <div className="input-change">
              <label>Mature Width:</label>
              <select
                value={newMatureWidth}
                onChange={(e) => setNewMatureWidth(e.target.value)}
              >
                <option value="" disabled>
                  Mature Width
                </option>
                <option value="2-3 inches">2-3 inches</option>
                <option value="3-4 inches">3-4 inches</option>
                <option value="4-6 inches">4-6 inches</option>
                <option value="6-8 inches">6-8 inches</option>
                <option value="8-12 inches">8-12 inches</option>
                <option value="12-18 inches">12-18 inches</option>
                <option value="18-24 inches">18-24 inches</option>
                <option value="24-36 inches">24-36 inches</option>
                <option value="36-48 inches">36-48 inches</option>
              </select>
            </div>

            <div className="input-change">
              <label>Plant Spacing:</label>
              <select
                value={newPlantSpacing}
                onChange={(e) => setNewPlantSpacing(e.target.value)}
              >
                <option value="" disabled>
                  Plant Spacing
                </option>
                <option value="2-3 inches">2-3 inches</option>
                <option value="2-3 inches (single row), 6-8 inches (double row)">
                  2-3 inches (single row), 6-8 inches (double row)
                </option>
                <option value="4-6 inches">4-6 inches</option>
                <option value="6-8 inches">6-8 inches</option>
                <option value="8-12 inches">8-12 inches</option>
                <option value="12-18 inches">12-18 inches</option>
                <option value="18-24 inches">18-24 inches</option>
                <option value="18-24 inches (invasive)">
                  18-24 inches (invasive)
                </option>
                <option value="24-36 inches">24-36 inches</option>
                <option value="36-48 inches">36-48 inches</option>
                <option value="2-3 inches (rows), 4-6 inches (between rows)">
                  2-3 inches (rows), 4-6 inches (between rows)
                </option>
              </select>
            </div>
            <div className="input-change">
              <label>Planting Depth:</label>
              <select
                value={newPlantingDepth}
                onChange={(e) => setNewPlantingDepth(e.target.value)}
              >
                <option value="" disabled>
                  Planting Depth
                </option>
                <option value="¼ inch">¼ inch</option>
                <option value="¼ - ½ inch">¼ - ½ inch</option>
                <option value="½ inch">½ inch</option>
                <option value="½ - 1 inch">½ - 1 inch</option>
                <option value="1 inch">1 inch (sets)</option>
                <option value="1-2 inches">1-2 inches</option>
                <option value="2-3 inches (in pots)">
                  2-3 inches (in pots)
                </option>
              </select>
            </div>
            <div className="input-change">
              <label>Maturation Time:</label>
              <select
                value={newMaturationTime}
                onChange={(e) => setNewMaturationTime(e.target.value)}
              >
                <option value="" disabled>
                  Maturation Time
                </option>
                <option value="3-4 weeks">3-4 weeks</option>
                <option value="4-6 weeks">4-6 weeks</option>
                <option value="4-6 weeks (leaves)">4-6 weeks (leaves)</option>
                <option value="6-8 weeks">6-8 weeks</option>
                <option value="6-8 weeks (planting), 80-100 days (harvest)">
                  6-8 weeks (planting), 80-100 days (harvest)
                </option>
                <option value="8-10 weeks">8-10 weeks</option>
                <option value="25-30 days">25-30 days</option>
                <option value="45-55 days">45-55 days</option>
                <option value="50-60 days">50-60 days</option>
                <option value="60-70 days">60-70 days</option>
                <option value="60-70 days (green), 70-80 days (red)">
                  60-70 days (green), 70-80 days (red)
                </option>
                <option value="70-80 days">70-80 days</option>
                <option value="90-100 days">90-100 days</option>
                <option value="100-120 days">100-120 days</option>
              </select>
            </div>

            <div className="input-change">
              <label>Light Requirements:</label>
              <select
                value={newLightRequirements}
                onChange={(e) => setNewLightRequirements(e.target.value)}
              >
                <option value="" disabled>
                  Light Requirements
                </option>
                <option value="Full Sun">Full Sun</option>
                <option value="Full to Part Sun">Full to Part Sun</option>
                <option value="Full Sun to Part Shade">
                  Full Sun to Part Shade
                </option>
              </select>
            </div>
            <div className="input-change">
              <label>Image URL:</label>
              <select
                value={newImgUrl}
                onChange={(e) => setNewImgUrl(e.target.value)}
              >
                <option value="" disabled>
                  Select Image
                </option>
                <option value={DEFAULT_IMAGE_URL}>Placeholder Image</option>
              </select>
            </div>

            <div className="input-change">
              <label>Seed Count:</label>
              <select
                type="text"
                value={newSeedCount}
                onChange={(e) => setNewSeedCount(e.target.value)}
              >
                <option value="" disabled>
                  Seed Count
                </option>
                <option value="300 Seeds">300 Seeds</option>
                <option value="500 Seeds">500 Seeds</option>
                <option value="800 Seeds">800 Seeds</option>
              </select>
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

            <button
              className="save-bttn"
              onClick={handleAddNewProduct}
              disabled={!isFormComplete} // Button is disabled if form is not complete
            >
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

      {/* Edit product View  */}
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
