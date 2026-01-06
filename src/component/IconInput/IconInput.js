import React from 'react';
import './index.css'

const IconInput = ({
    onChange,
    placeholder,
    style,
    id,
    defaultValue,
    disabled,
    label,
    first_icon,
    second_icon
}) => {
    return (
        <div>
            <div className='label-text'>
                {label}
            </div>
            <div style={{
                position: 'relative'
            }}>
                <div style={{ position: 'absolute', left: "15px", top: "20px" }}>
                    {first_icon}
                </div>
                <div >
                    <input
                        className="input"
                        style={{ ...style }}
                        disabled={disabled}
                        onChange={onChange}
                        defaultValue={defaultValue}
                        placeholder={placeholder && placeholder}
                        id={id}
                    />
                </div>
                <div style={{ position: 'absolute', right: "15px", top: "20px",cursor:'pointer' }}>
                    {second_icon}
                </div>
            </div>
        </div>
    );
};

export default IconInput;
