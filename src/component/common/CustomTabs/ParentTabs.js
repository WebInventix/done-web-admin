import React, { useEffect, useState } from "react";
import CustomTabs from "./CustomTabs";
import { useSelector } from "react-redux";

function ParentTabs() {

  const { pageValue } = useSelector((state) => state.userAuth);
  const [selectedTab, setSelectedTab] = useState(pageValue); // Initial tab value


  // useEffect(() => {
  //   setSelectedTab(pageValue)
  //   console.log(pageValue);
  // }, [])
  
    console.log(pageValue);

  const handleChange = (newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      {/* Other content */}
      <CustomTabs value={pageValue} handleChange={handleChange} />
    </div>
  );
}

export default ParentTabs;
