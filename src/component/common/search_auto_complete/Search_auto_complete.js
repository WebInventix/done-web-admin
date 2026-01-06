import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { themeGray } from "../../../utils/colorTheme";
// import "./App.css";
// import logo from "./sickdoodle.png";
 
function Search_auto_complete() {
  const items = [
    {
      id: 0,
      name: "Cobol",
    },
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Basic",
    },
    {
      id: 3,
      name: "PHP",
    },
    {
      id: 4,
      name: "Java",
    },
  ];



  

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  
  return (
    <div className="App">
      <header className="App-header">
        <div style={{  margin: 20, }}>
          
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onClear={handleOnClear}
            styling={{ zIndex: 4 ,borderRadius:"5px",backgroundColor:themeGray}} // To display it on top of the search box below
            autoFocus
          />
        </div>
       
       
      </header>
    </div>
  );
}

export default Search_auto_complete;