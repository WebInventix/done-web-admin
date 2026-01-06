import React, { useState } from 'react';

function MultiDatePicker() {
    const [selectedDates, setSelectedDates] = useState([]);

    const handleDateClick = (date) => {
        // Toggle date selection
        if (selectedDates.includes(date)) {
            setSelectedDates(selectedDates.filter(d => d !== date));
        } else {
            setSelectedDates([...selectedDates, date]);
        }
    };

    return (
        <div>
            <h2>Select Dates</h2>
            <div>
                {Array.from({ length: 7 }).map((_, index) => {
                    const date = new Date();
                    date.setDate(date.getDate() + index);
                    const dateString = date.toDateString();
                    const isSelected = selectedDates.includes(dateString);
                    return (
                        <div key={dateString} style={{ margin: '5px', display: 'inline-block' }}>
                            <button
                                style={{ background: isSelected ? 'blue' : 'white', color: isSelected ? 'white' : 'black' }}
                                onClick={() => handleDateClick(dateString)}
                            >
                                {dateString}
                            </button>
                        </div>
                    );
                })}
            </div>
            <div>
                <h2>Selected Dates</h2>
                {selectedDates.map(date => (
                    <div key={date}>{date}</div>
                ))}
            </div>
        </div>
    );
}

export default MultiDatePicker;
