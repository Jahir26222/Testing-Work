import React from 'react'
import { useState, useEffect } from 'react'
import './Order.css'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'




const Order = () => {

  const navigate = useNavigate();



  const [product2, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);


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

  const filteredProducts = product2.filter(product => {
    const productName = product?.ProductName?.toLowerCase() || "";
    const productCategory = product?.Category?.toLowerCase() || ""; // Ensure it's a string
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
    setEditId(product._id);
    setFormData({ ...product });

  };

  const handleCancelEdit = () => {
    setSelectedProduct(null);
  }

 const showDetails = () =>{
  navigate('/order-detail')
 }

  return (
    <div className='main-box'>
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <p>Order</p>
        <div className="top-right">

        </div>
      </div>

      <div className="four-card">
        <div className="crd">
          <div className="crd-left">
            <p>Processing</p>
            <h2>1,202</h2>
            <p className='progress'><span>10%</span><i className="fa-solid fa-caret-up" style={{ color: "green" }}></i>+120today</p>
          </div>
          <div className="crd-right">
            <div className="icon-box">
              <i className="fa-solid fa-box " style={{ color: "#FFF" }}></i></div>
          </div>
        </div>
        <div className="crd"> <div className="crd-left">
          <p>Shipped</p>
          <h2>1,202</h2>
          <p className='progress'><span>10%</span><i className="fa-solid fa-caret-up" style={{ color: "green" }}></i>+120today</p>
        </div>
          <div className="crd-right">
            <div className="icon-box" style={{ backgroundColor: "#3250FF" }}>
              <i className="fa-solid fa-truck-fast" style={{ color: "#FFF" }}></i></div>
          </div>
        </div>
        <div className="crd"> <div className="crd-left">
          <p>Deliverd</p>
          <h2>1,202</h2>
          <p className='progress'><span>10%</span><i className="fa-solid fa-caret-up" style={{ color: "green" }}></i>+120today</p>
        </div>
          <div className="crd-right">
            <div className="icon-box" style={{ backgroundColor: "#2BB2FE" }}>
              <i className="fa-solid fa-cart-arrow-down" style={{ color: "#FFF" }}></i></div>
          </div></div>
        <div className="crd"> <div className="crd-left">
          <p>Cancled</p>
          <h2>1,202</h2>
          <p className='progress'><span>10%</span><i className="fa-solid fa-caret-up" style={{ color: "green" }}></i>+120today</p>
        </div>
          <div className="crd-right">
            <div className="icon-box" style={{ backgroundColor: "#EB3D4D" }}>
              <i className="fa-solid fa-circle-xmark" style={{ color: "#FFF" }}></i></div>
          </div></div>
      </div>


      <div className="main-bar">
        <div className="search-div2">
          <div className="two-option">
            <div className="filter2">
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

              <div className='search-input'>
                <i className="fa-solid fa-search" style={{ marginRight: "15px" }}></i>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>

            </div>
          </div>

        </div>

        <div className="product-list">
          <div className="product-table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Product Name</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Price</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>

                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product, index) => (
                  <tr key={index}>
                    <td style={{ justifyContent: "center" }} className='order-id' onClick={showDetails}>#23489F</td>
                    <td className="product-details" onClick={showDetails}>
                      <img src={product.ProductImage} alt={product.ProductName} />
                      <div>
                        <div className="product-name">{product.ProductName}</div>
                        <div className="product-category">{product.Category}</div>
                      </div>
                    </td>
                    <td>May 5, 4:20 PM</td>
                    <td>Divayaraj Shinh</td>
                    <td>{product.Price}</td>
                    <td><p className='pymt-status'>Paid</p></td>
                    <td><p className='order-status'>Delivered</p></td>
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
    </div>
  )
}

export default Order