import React from 'react'
import { useNavigate } from 'react-router-dom'
import './OrderDetail.css';

const OrderDetail = () => {

  const navigate = useNavigate()

  return (
    <div className='order-detail-container'>
      <div className="container-top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <p>Order #23489F</p>
        <button className="order-detail-exportBtn"> Export</button>
      </div>

      <div className="order-description-box">
        <div className="order-description-box-left">
          <div className="top-left-description-box">
            <div className="top-bar-box">
              <div className="heading-name">
                <p id='p-heading'>Product</p>
                <span id='span'>2 product</span>
              </div>
              <div className="date-section">
                <i className="ri-calendar-2-fill" id='calendar'></i>
                <p>13 January 2024 , 14:00</p>
                <span id='span'>Shipped</span>
              </div>
            </div>

            <div className="table-data">
              <table>
                <thead>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>QTY</th>
                  <th>price</th>
                  <th>Total</th>
                </thead>

                <tbody>
                  <td className="product-details-td">
                    <img src="public\images\Corporate.webp" alt="img" />
                    <div>
                      <div className="product-name2">gulabjamun</div>
                      <div className="product-category">250 gms</div>
                    </div>
                  </td>
                  <td>302011</td>
                  <td>2 PCS</td>
                  <td>450 Rs</td>
                  <td>900 Rs</td>
                </tbody>
              </table>
            </div>

            <div className="total-amout-box">
              <div className="value-amount">
                <div className="lable-data">
                  <h5>Subtotal</h5> <span>585 Rs</span>
                </div>
                <div className="lable-data">
                  <h5>Discount</h5> <p>New Customer</p>
                </div>
                <div className="lable-data">
                  <h5>Shipping Rate</h5> <p>12 RS</p>
                </div>
                <div className="lable-data">
                  <h5 style={{fontSize:"18px" ,  fontWeight:"600"}}>Grand Total</h5> <p style={{fontWeight:"600"}}>597</p>
                </div>
                
              </div>
            </div>
          </div>
          <div className="bottom-left-description-box">
            <div className="bottom-left">
              <div className="address-heading">
                <div className='address-circle'>
                  <i className="fa-solid fa-location-dot" id='location-icon'></i>
                </div> <h3>Shipping Address</h3>
              </div>
              <div className="text-address">
                <span><i className="fa-solid fa-house"></i> Address</span>
                <div className="address-text-box">
                  <p>Jay Hadgunson <br />
                    1833 Bel Meadow Drive, Fontana, <br />California 92335, USA</p>
                </div>
              </div>
            </div>
            <div className="bottom-right">
              <div className="address-heading">
                <div className='address-circle'>
                  <i className="fa-solid fa-location-dot" id='location-icon'></i>
                </div> <h3>Billing Address</h3>
              </div>
              <div className="text-address">
                <span><i className="fa-solid fa-house"></i> Address</span>
                <div className="address-text-box">
                  <p>Jay Hadgunson <br />
                    1833 Bel Meadow Drive, Fontana, <br />California 92335, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-description-box-right">
          <div className="description-box-1">
            <div className="address-heading" >
              <div className='address-circle'>
                <i class="fa-solid fa-circle-info" id='location-icon'></i>
              </div><h3>Genral Information</h3>
            </div>

            <div className="input-area">
              <span><i class="fa-solid fa-cart-shopping"></i>Order Status</span>
            </div>

            <div className="dropdown-section">
              <select>
                <option value="Processing">Processing</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
                <option value="Out of Delivery">Out of Delivery</option>
              </select>
            </div>

            <div className="customer-name-box">
              <div className="input-area2">
                <span><i class="fa-solid fa-user"></i>Customer</span>
                <p>Malani harsh</p>
              </div>
            </div>

            <div className="customer-name-box">
              <div className="input-area2">
                <span><i class="fa-solid fa-envelope"></i>Email</span>
                <p>harsh2@gmail.com</p>
              </div>
            </div>

            <div className="customer-name-box">
              <div className="input-area2">
                <span><i class="fa-solid fa-phone"></i>Phone Number</span>
                <p>74846851894</p>
              </div>
            </div>



          </div>

          <div className="description-box-2">
            <div className="address-heading" >
              <div className='address-circle'>
                <i class="fa-solid fa-circle-info" id='location-icon'></i>
              </div><h3>Genral Information</h3>
            </div>


            <div className="customer-name-box">
              <div className="input-area2">
                <span><i class="fa-solid fa-id-badge"></i>ID</span>
                <p>7325841548915</p>
              </div>
            </div>

            <div className="customer-name-box">
              <div className="input-area2">
                <span><i class="fa-regular fa-credit-card"></i>Payment Method</span>
                <p>VISA</p>
              </div>
            </div>
          </div>
          <div className="description-box-3">

          <div className="address-heading" >
              <div className='address-circle'>
                <i class="fa-solid fa-circle-info" id='location-icon'></i>
              </div><h3>Shipping</h3>
            </div>
             
            <div className="customer-name-box">
              <div className="input-area2">
                <span><i className="fa-solid fa-truck-fast" ></i>Shipping ID</span>
                <p>SHP1358</p>
              </div>
            </div>


            <div className="customer-name-box">
              <div className="input-area2">
                <span><i class="fa-solid fa-id-badge"></i>Shipping Method</span>
                <p>Regular</p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default OrderDetail