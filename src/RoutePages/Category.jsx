

import React, { useEffect, useState } from 'react';
import './Category.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Category = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState(""); // State for category name
  const [files, setFiles] = useState([]); // State for selected images
  const [previews, setPreviews] = useState([]); // State for image previews

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("http://localhost:5000/category2");
        const data2 = await response.json();
        setData2(data2);
        console.log(data2)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchdata();
  }, []);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/category");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const [catImage, setCatImage] = useState([]);

  useEffect(() => {
    const CategoryImage = async () => {
      try {
        const CatImg = await fetch('http://localhost:5000/cat');
        const img = await CatImg.json();
        setCatImage(img)
      }
      catch (error) {
        console.log(error);

      }
    }
    CategoryImage();
  }, [])

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    const response = await axios.get('http://localhost:5000/product');
    setData(response.data);
  };

  const navigate = useNavigate();

  // Generate previews for selected images
  useEffect(() => {
    if (!files.length) return;

    let tmp = files.map((file) => URL.createObjectURL(file));
    setPreviews(tmp);

    // Cleanup memory
    return () => {
      tmp.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  // Function to clear form fields
  const clearForm = () => {
    setCategoryName(""); // Clear text input
    setFiles([]); // Clear selected files
    setPreviews([]); // Clear image previews
    document.getElementById("file").value = ""; // Reset file input
  };

  const handleSave = async () => {
    if (!categoryName || files.length === 0) {
      alert("Please enter a category name and select an image.");
      return;
    }
    const formData = new FormData();
    formData.append("name", categoryName);
    files.forEach((file) => formData.append("image", file));

    try {
      const response = await axios.post("http://localhost:5000/category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Category added successfully!");
        setIsModalOpen(false);
        clearForm();
        // Refresh categories
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category.");
    }
  };


  return (
    <div className="category-container">
      {/* Background content with blur effect */}
      <div className={`content ${isModalOpen ? 'blur' : ''}`}>
        <div className="top-bar">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <p>Categories</p>
          <div className="top-right">
            <button onClick={() => setIsModalOpen(true)}>
              <i className="fa-solid fa-plus add-btn"></i> Add Category
            </button>
          </div>
        </div>

        <div className="product-card-container">
          {categories.map((e, index) => (
            <div className="category-card" key={index}>
              <div className="card-image">
                <img src={e.image} alt="Category" />
              
              </div>
              <div className="name-size">
                <h4 className='ans-card'>{e.name || "Uncategorized"}</h4>
            

                {
                  (() => {
                    const matchedCategory = data2.find((c) => e.name === c._id);
                    return matchedCategory ? (
                      <p className='ans-card'>{matchedCategory.count} items</p>
                    ) : (
                      <p className='ans-card'>0 items</p>
                    );
                  })()
                }

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className='text-div'>
              <h2>Add Category</h2>
              <i className="fa-solid fa-xmark" onClick={() => setIsModalOpen(false)}></i>
            </div>
            <form>
              <label>Category Name</label>
              <input
                type="text"
                placeholder="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />

              <div className="file-box">
                <h3 style={{ marginTop: '10px' }}>Images</h3>
                <div className="img-box">
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
                  <label htmlFor="file">Add File</label>
                  <span>Or drag and drop files</span>
                </div>
                {previews.map((pic, index) => (
                  <div key={index} style={{ width: "120px", height: "120px", display: "flex" }}>
                    <div style={{ display: "flex" }}>
                      <img src={pic} alt="Preview" style={{ height: "50px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </form>

            <div className='button-box'>
              <button type="button" className='clear-btn' onClick={clearForm}>Clear</button>
              <button className="close-btn" onClick={handleSave}>save</button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Category;
