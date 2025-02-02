import React from 'react'
import './MainSection.css'
import { Link } from "react-router-dom";
const MainSection = () => {
    return (
        <>
            <main className='main'>

                <div className="dash">
                    <p>Dashboard</p>
                </div>

                <div className="card-container">
                    <Link to='product'>
                    <div className="box">
                        <div className="top">
                            <button style={{ backgroundColor: "#F66EF6" }}><i className="fa-solid fa-tag" id='font'></i></button>
                        </div>
                        <div className="bottom">
                            <p>Product</p>
                        </div>
                    </div>
                    </Link>

                    <Link to='category'>
                    <div className="box">
                        <div className="top">
                            <button style={{ backgroundColor: "#ADD8E6" }}><i className="fa-regular fa-folder" id='font'></i></button>
                        </div>
                        <div className="bottom">
                            <p>Category</p>
                        </div>
                    </div>
                    </Link>

                    <Link to='order'>
                    <div className="box">
                        <div className="top">
                            <button style={{ backgroundColor: "#FF9797" }}><i className="fa-regular fa-rectangle-list" id='font'></i></button>
                        </div>
                        <div className="bottom">
                            <p>Order</p>
                        </div>
                    </div>
                    </Link>

                </div>
               {/* setting card */}

                <div className="dash"> <p>Setting</p> </div>
                <div className="card-container" style={{justifyContent:"start" }}>

                <Link to='setting-product'>
                   <div className="box" style={{marginLeft:"9.9rem"}}>
                        <div className="top">
                            <button style={{ backgroundColor: "#FF9797" }}><i className="fa-regular fa-user" id='font'></i></button>
                        </div>
                        <div className="bottom">
                            <p>Profile</p>
                        </div>
                    </div>
                 </Link>   
                </div>

            </main>







        </>
    )
}

export default MainSection