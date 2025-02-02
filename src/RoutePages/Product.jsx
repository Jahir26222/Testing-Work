import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Product.css';
import axios from 'axios';
import { toast } from 'react-toastify';


const Product = () => {
  const [product2, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold selected product for editing
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    ProductName: '',
    ProductDescription: '',
    ProductIngredients: '',
    ProductWeight: '',
    Price: '',
    ShelfLife: '',
    Category: '',
    StateOrigin: '',
    ProductImage: '',
  });


  // const options = [
  //   { id: "sweet", label: "Sweet" },
  //   { id: "namkeen", label: "Namkeen" },
  //   { id: "sugar_free", label: "Sugar Free" },
  //   { id: "sweet_hampers", label: "Sweet Hampers" },
  //   { id: "namkeen_hamper", label: "Namkeen Hampers" },
  //   { id: "corporate_collection", label: "Corporate Collection" },
  //   { id: "wedding_collection", label: "Wedding Collection" },
  //   { id: "combos", label: "Combos" },
  // ];

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories(); // Fetch categories when the component loads
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/category'); // Adjust the API endpoint as per your backend
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

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

  // const filteredProducts = product2.filter(product => {
  //   const matchesSearch = product.ProductName.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesCategory = 
  //     selectedOptions.length === 0 || 
  //     selectedOptions.includes(product.Category.toLowerCase());
  //   return matchesSearch && matchesCategory;
  // });

  // const filteredProducts = product2.filter(product => {
  //   const productName = product?.ProductName?.toLowerCase() || "";
  //   const productCategory = product?.Category?.toLowerCase() || "";
  //   const searchValue = searchQuery?.toLowerCase() || "";

  //   const matchesSearch = productName.includes(searchValue);
  //   const matchesCategory = 
  // selectedOptions.length === 0 || selectedOptions.includes(product.Category);


  //   return matchesSearch && matchesCategory;
  // });

  const filteredProducts = product2.filter(product => {
    const productName = product?.ProductName?.toLowerCase() || "";
    const productCategory = product?.Category?.toLowerCase() || ""; 
    const searchValue = searchQuery?.toLowerCase() || "";

    const matchesSearch = productName.includes(searchValue.toString());

    const matchesCategory = 
      selectedOptions.length === 0 || selectedOptions.includes(product.Category.toString());

    return matchesSearch && matchesCategory;
});


  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {



    try {
      await axios.delete(`http://localhost:5000/product/${id}`);
      toast.success('Product deleted successfully!');
      fetchProducts();

    } catch (error) {
      console.error('Error deleting product:', error);
      toast.warning('Failed to delete product.');
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((option) => option !== id) : [...prev, id]
    );
  };

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleEdit = (product) => {
    navigate('/add-form')
    setEditId(product._id); // Set the ID for updating
    setFormData({ ...product });

  };

  const handleCancelEdit = () => {
    setSelectedProduct(null);
  }
  const navigate = useNavigate();




  return (

    <div className="main-box">
      {selectedProduct ? (
        <AddForm
          product={selectedProduct} // Pass selected product to form
          onCancel={() => handleCancelEdit(null)} // Handle form cancel action
        />
      ) : (
        <>
          <div className="top-bar">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <p>Products</p>
            <div className="top-right">
              <button className="btn-export">Export</button>
              <button>
                <Link to="/add-product" style={{ color: "#fff" }}>
                  <i className="fa-solid fa-plus"></i> Add Product
                </Link>
              </button>
            </div>
          </div>

          <div className="main-bar">
            <div className="search-div">
              <div className="filter">
                <div className="custom-dropdown">
                  <button className="dropdown-btn" onClick={toggleDropdown}>
                    Filter
                    <i className="fa-solid fa-angle-down down" style={{ marginLeft: "80px" }}></i>
                  </button>
                  {isOpen && (
                    <div className="dropdown-menu" onMouseLeave={toggleDropdown}>
                      <ul>
                        {categories.map((category ,index) => (
                          <li key={index}>
                            <input
                              type="checkbox"
                              id={category._id}
                              value={category.name}
                              checked={selectedOptions.includes(category.name)}
                              onChange={() => handleCheckboxChange(category.name)}
                            />
                            <label htmlFor={category._id}>{category.name}</label>
                          </li>
                        ))}

                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="search">
                <i className="fa-solid fa-search"></i>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="product-list">
              <div className="product-table">
                <table>
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Self Life</th>
                      <th>StateOrigin</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map((product, index) => (
                      <tr key={index}>
                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td className="product-details">
                          <img src={product.ProductImage} alt={product.ProductName} />
                          <div>
                            <div className="product-name">{product.ProductName}</div>
                            <div className="product-category">{product.Category}</div>
                          </div>
                        </td>
                        <td>{product.Price}</td>
                        <td>{product.ProductWeight}</td>
                        <td>{product.ShelfLife}</td>
                        <td>{product.StateOrigin}</td>
                        <td>4.5</td>
                        <td>
                          <button className="edit">
                            <Link to={`/edit/${product._id}`} style={{ textDecoration: "none" }}>
                              <i className="fa-solid fa-pen" style={{ color: "blue" }}></i>
                            </Link>
                          </button>
                          <button className="delete" onClick={() => handleDelete(product._id)}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="pagination">
                  <div>
                    <button
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </button>

                    {[...Array(totalPages).keys()].map((page) => (
                      <button
                        key={page + 1}
                        style={{ color: currentPage === page + 1 ? '#9D0910' : '#5c5a5a' }}

                        onClick={() => handlePageChange(page + 1)}
                      >
                        {page + 1}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                  <span style={{ color: "#5c5a5a", marginRight: "15px" }}>{filteredProducts.length} Result</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>

  );
};


export default Product
