import React from 'react'
import css from './CustomTextArea.module.css'

const CustomTextArea = ({ label, value, onChange, placeholder, rows, cols }) => {
  return (
    <div className={css.text_area_container}>
      {label && <label className={css.text_area_label}>{label}</label>}
      <textarea
        className={css.text_area}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
      />
    </div>
  )
}

export default CustomTextArea
