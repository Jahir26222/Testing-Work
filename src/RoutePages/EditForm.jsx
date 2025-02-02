import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './EditForm.css'
import { useParams , useNavigate } from 'react-router-dom'


const EditForm = () => {
  const navigate = useNavigate();
  const {_id} =  useParams();
  const [data , setData] = useState(
    {
      ProductName: '',
      ProductDescription: '',
      ProductIngredients: '',
      ProductWeight: '',
      Price: '',
      ShelfLife: '',
      Category: '',
      StateOrigin: '',
      ProductImage: '',
      ProductNutritions: '',
      StorageInstruction: '',
    }
  );
   

  useEffect(()=>{
    axios
    .get(`http://localhost:5000/product/${_id}`)
    .then((res) => setData(res.data))
    .catch ((error) =>
      console.error('Error fetching products:', error))

  }, [_id])

  const handleChange = (e) => {
    const { name, value } = e.target.value;
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };
  


  console.log("id is ",data)

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/product/${_id}`, data) // Update product in the database
      .then(() => {
        alert('Product updated successfully!');
        navigate('/product'); // Redirect to the product list or another page
      })
      .catch((err) => console.log(err));
  };

  
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
              value={data.ProductName}
              onChange={handleChange}
              placeholder="Product Name"
              
            />

            <label>Product Description</label>
            <input
              type="text"
              name="ProductDescription"
              value={data.ProductDescription}
              onChange={handleChange}
              placeholder="Product Description"
              
            />
          </div>

          <div className="file-box">

            <h3 style={{ marginTop: '10px' }}>images</h3>
            <div className="img-box">
              <input type="file" id="file"
                // onChange={handleImageChange}
              />

              <label htmlFor="file"
                // value={data.ProductIngredients} 
                
                placeholder="Ingredients"

              >Add File</label>
              <span>Or drag and drop files</span>
            </div>
          </div>

          <div className="price-box">
            <h3>Price and Quality information</h3>
            <div className="price-input">
              <div className="price-left">
                <label >Product Price</label>
                <input
                  type="text"
                  name="Price"
                  value={data.Price}
                  onChange={handleChange}
                  placeholder="Price ($)"
                />
              </div>
              <div className="price-right">
                <label >Weight</label>
                <input
                  type="text"
                  name="ProductWeight"
                  value={data.ProductWeight}
                  onChange={handleChange}
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
                  value={data.Category}
                  onChange={handleChange}
                >
                  <option value="Sweet">Sweet</option>
                  <option value="Namkeen">Namkeen</option>
                  <option value="Sweet_Hampers">Sweet Hampers</option>
                  <option value="Sugar_Free">Sugar Free</option>
                  <option value="Namken_Hampers">Namkeen Hampers</option>
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
                    value={data.ShelfLife}
                    onChange={handleChange}
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
                value={data.ProductNutritions}
                onChange={handleChange}
                required
                placeholder="Enter Nutritions" />

              <label>Product Ingredients</label>
              <input
                type="text"
                name="ProductIngredients"
                value={data.ProductIngredients}
                onChange={handleChange}
                required
                placeholder="Enter Ingredients"
              />

              <label>Storage Instruction</label>
              <input
                type="text"
                name="StorageInstruction"
                value={data.StorageInstruction}
                onChange={handleChange}
                required
                placeholder="Enter Instruction"
              />

              <label htmlFor="state">Satate</label>
              <div className="option">

                <select id="state"
                  name="StateOrigin"
                  value={data.StateOrigin}
                  onChange={handleChange}


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
        <button type="Submit" onClick={handleSubmit}>Edit</button>
      </div>
    </div>
    

  )
}

export default EditForm


