import React from 'react';
import './SearchBar.css'; // Import the CSS file
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons library

const SearchBar = ({ placeholder, onSearch, buttonText }) => {
    return (
        <div className='search-container'>
            <div className='right-content'>
                <div>
                    <FaSearch className="search-icon" />
                </div>
                <div>
                    <input className='input-text' type="text" placeholder={"Select or Search for a Service"} />
                </div>
            </div>
            <div>
                <button className='hero-btn' onClick={onSearch}>{"GO"}</button>
            </div>
        </div>
    );
};

export default SearchBar;
