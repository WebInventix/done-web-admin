import React, { useState } from "react";
import css from "./CustomTabs.module.css";

const CustomTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0); // State to track the active tab

  return (
    <div className={css.tabs_container}>
      <div className={css.tabs}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`${css.tab_button} ${
              activeTab === i ? css.active : ""
            } ${i !== 0 && i !== tabs.length - 1 ? css.middle_tab : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab_content">{tabs[activeTab].content}</div>
    </div>
  );
};

export default CustomTabs;
