import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { IoSearchSharp } from 'react-icons/io5';
import { MdOutlineClose } from 'react-icons/md';
import "../../../styles/search.scss";
import { IoMdSearch } from "react-icons/io";

const SearchAll = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearchClick = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/searchresults/${query}`);
      console.log('Searching for:', query);
    }
  };

  return (
    <div className="search-bar">
      <button onClick={handleSearchClick} className="search-icon-btn">
        {isInputVisible ? (
          <MdOutlineClose size={26} />
        ) : (
          <IoSearchSharp className="search-icon" />
        )}
      </button>
      {isInputVisible && (
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search…"
            className="search-input"
            value={query}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-submit-btn">
            <IoMdSearch />
          </button>
        </form>
      )}
    </div>
  );
};

export default SearchAll;
