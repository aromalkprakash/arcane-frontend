import React from 'react';
import { SlSocialInstagram } from "react-icons/sl";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsThreads } from "react-icons/bs";
import "../../../styles/footer.scss";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="footer-div">
            <div className="footer-both">
                <div className="footer-items-div">
                    <Link href="/about"><p className="footer-item">About</p></Link>
                    <Link href="/signup"><p className="footer-item">Account</p></Link>
    
                    <p className="footer-item">Terms & Policy</p>
                    <p className="footer-item">Contact</p>
                    <p className="footer-item">Help</p>
              
                </div>
                <div className="footer-icons-div">
                    <Link href="https://www.instagram.com/aromalkprakash?igsh=OHM3Z2liNnIyOHl3">
                    <SlSocialInstagram size={25} />    
                    </Link>
                    
                    <BsThreads size={25} />
                    <FaFacebookSquare size={25} />
                    <FaXTwitter size={25} />

                </div>
            </div>
          
            
            <div className="rights-div">
                <p className="rights">© 2024 The Name Company. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer
