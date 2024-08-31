import Link from "next/link";
import React from 'react';
import "../../../styles/navbar2.scss"

const Navbar2 = () => {
    return (
        <div className="navbar-container">
            <div className="navbar2">
                <h1>wwhwhhwh</h1>
                <div className="nav2-btn">
                    <Link href="/login">
                        <button className="nav2">Login</button>
                    </Link>
                
                    <Link href="/signup">
                        <button className="nav2">SignUp</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar2;