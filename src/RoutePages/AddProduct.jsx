import React, { useEffect, useState } from "react"
import './AddProduct.css'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


const AddProduct = () => {

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    ProductName: '',
    ProductDescription: '',
    ProductIngredients: '',
    ProductWeight: '',
    Price: '',
    ShelfLife: '',
    Category: 'Sweet',
    StateOrigin: 'Andhra Pradesh',
    ProductImage: '',
    ProductNutritions: '',
    StorageInstruction: '',
  });

  const [files, setFiles] = useState([]); // Initialize as an array
  const [previews, setPreviews] = useState([]);

  // Rendering previews
  useEffect(() => {
    if (!files.length) return;

    let tmp = files.map((file) => URL.createObjectURL(file));
    setPreviews(tmp);

    // Cleanup memory
    return () => {
      tmp.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  // const [image, setImage] = useState(null); // For image file
  // const [editId, setEditId] = useState(null); 

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //   }
  // };
  const [editId, setEditId] = useState(null); // To track if updating a product

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // resetForm()
  };

  const resetForm = () => {


    setFormData({
      ProductName: '',
      ProductDescription: '',
      ProductWeight: '',
      Price: '',
      ShelfLife: '',
      Category: '',
      StateOrigin: '',
      ProductImage: '',
      ProductNutritions: '',
      ProductIngredients: '',
      StorageInstruction: '',
    });
    setEditId(null); // Reset edit state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // Update product
        await axios.put(`http://localhost:5000/product/${editId}`, formData);
        alert('Product updated successfully!');
      } else {
        // Create product
        await axios.post('http://localhost:5000/product', formData);
        toast.success('Product created successfully!');
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const navigate = useNavigate();
  return (

    <div className="form-container">


      <div className="form-top">
        <button className="back-btn" onClick={() => navigate(-1)}><i className="fa-solid fa-chevron-left"></i></button>
        <p>Add Product</p>
      </div>
      <div className="form-section">

        <div className="left-form">
          <h3 >Information</h3>
          <div className="input-box">
            <label>Product Name</label>
            <input
              type="text"
              name="ProductName"
              value={formData.ProductName}
              onChange={handleInputChange}
              placeholder="Product Name"
              required
            />

            <label>Product Description</label>
            <input
              type="text"
              name="ProductDescription"
              value={formData.ProductDescription}
              onChange={handleInputChange}
              placeholder="Product Description"
              required
            />
          </div>

          <div className="file-box">

            <h3 style={{ marginTop: '10px' }}>images</h3>
            <div className="img-box">
              {/* <input type="file" id="file"
                onChange={handleImageChange}
              /> */}
              <input
                type="file"
                id="file"
                accept="image/jpg, image/jpeg, image/png"
                multiple
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files)]);
                  }
                }}
              />

              <label htmlFor="file"
                value={formData.ProductIngredients}
                onChange={handleInputChange}
                placeholder="Ingredients"

              >Add File</label>
              <span>Or drag and drop files</span>
            </div>
            {previews.map((pic, index) => (
        <div
          key={index}
          style={{
            width: "120px",
            height: "120px",
            display: "flex",
          }}
        >

          <div style={{ display:"flex"}}><img src={pic} alt="Preview" style={{ height: "50px" }} /></div>
        </div>
      ))}
          </div>

          <div className="price-box">
            <h3>Price and Quality information</h3>
            <div className="price-input">
              <div className="price-left">
                <label >Product Price</label>
                <input
                  type="String"
                  name="Price"
                  value={formData.Price}
                  onChange={handleInputChange}
                  placeholder="Price ($)"
                />
              </div>
              <div className="price-right">
                <label >Weight</label>
                <input
                  type="String"
                  name="ProductWeight"
                  value={formData.ProductWeight}
                  onChange={handleInputChange}
                  placeholder="Weight (g)"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="right-form">
          <div className="top">
            <h3>Categories</h3>
            <div className="check-div">
              <div className="option">

                <select
                  id="categories"
                  name="Category"
                  value={formData.Category}
                  onChange={handleInputChange} // Use onChange instead of onSelect
                >
                  <option value="Sweet">Sweet</option>
                  <option value="Namkeen">Namkeen</option>
                  <option value="Sweet_Hampers">Sweet Hampers</option>
                  <option value="Sugar_Free">Sugar Free</option>
                  <option value="namkeen_hampers">Namkeen Hampers</option>
                  <option value="Corporate_Collection">Corporate Collection</option>
                  <option value="Wedding_Collection">Wedding Collection</option>
                  <option value="Combos">Combos</option>
                </select>

              </div>

              <div className="shelfLife-div">
                <h3>ShelfLife</h3>
                <div className="shelf-input">
                  <input
                    type="text"
                    name="ShelfLife"
                    value={formData.ShelfLife}
                    onChange={handleInputChange}
                    placeholder="Shelf Life (months)"
                  />
                </div>
              </div>
            </div>


          </div>
          <div className="down">
            <h3>Different Options</h3>
            <div className="option-box">
              <label>Product Nutritions</label>
              <input
                type="text"
                name="ProductNutritions"
                value={formData.ProductNutritions}
                onChange={handleInputChange}
                required
                placeholder="Enter Nutritions" />

              <label>Product Ingredients</label>
              <input
                type="text"
                name="ProductIngredients"
                value={formData.ProductIngredients}
                onChange={handleInputChange}
                required
                placeholder="Enter Ingredients"
              />

              <label>Storage Instruction</label>
              <input
                type="text"
                name="StorageInstruction"
                value={formData.StorageInstruction}
                onChange={handleInputChange}
                required
                placeholder="Enter Instruction"
              />

              <label htmlFor="state">Satate</label>
              <div className="option">

                <select id="state"
                  name="StateOrigin"
                  value={formData.StateOrigin}
                  onChange={handleInputChange}


                >
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="btn-box">
        <button style={{ border: "2px solid #D9E1EC" }}>cancel</button>
        <button type="Submit" onClick={handleSubmit}>Save</button>
      </div>
    </div>

  )
}

export default AddProduct