import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Dropdown from '../homeDropdown';
import { User } from '@/types/type';
import { GetMe } from '@/api/userUrl';
import Navbar2 from './Navbar2';
import '../../../styles/navbar.scss';
import SearchAll from '../Search/SearchUsers';
import { IoIosMenu } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
// import LogOut from "@/components/common/LogOut";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await GetMe();
        setUser(userData);
      } catch (error) {
        // console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (isSidebarVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isSidebarVisible]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (!user) {
    return <Navbar2 />;
  }

  return (
    <div className="navbar-container">
      <div className="navbar-header">
        <Link href="/" className="navbar-logo">
          wwhwhhwh
        </Link>
        <div className="navbar-links">
          <Dropdown user={user} />
          {user.role === 'ADMIN' && (
            <Link href="/addmovies" className="nav-line">
              Add movie
            </Link>
          )}
          <Link href="/allusers" className="nav-line">Members</Link>
          <Link href="/allfilms" className="nav-line">Films</Link>
          <Link href="/chat" className="nav-line">
            Chat
          </Link>
          <Link href="/about">
          <h1 className="nav-line">About us</h1>
          </Link>
          {/* <LogOut/> */}
          <SearchAll />
          <button onClick={toggleSidebar} className="menu-icon-btn">
            <IoIosMenu size={30} />
          </button>
        </div>
      </div>

      {isSidebarVisible && (
        <div className="sidebar">
          <button onClick={closeSidebar} className="close-sidebar-btn">
            <MdOutlineClose size={30} />
          </button>
          <Link href={`/profile/${user.username}`}>
            <h1 className="sidebar-item">Profile</h1>
          </Link>
          {user.role === 'ADMIN' && (
            <Link href="/addmovies">
              <h1 className="sidebar-item">Add movie</h1>
            </Link>
          )}
          <Link href="/chat">
            <h1 className="sidebar-item">Chat</h1>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
