import React from 'react'
import './selectComp.css'


const SelectComp = ({ renderArray,placeholder,style,onChange,value,multiple }) => {
  return (
    <select onChange={onChange} className="searchSelect" multiple={multiple} style={{...style}}>
      <option disabled selected>{placeholder?placeholder:"Select Value"}</option>

      {
        renderArray?.map((e) => {
          return <option value={value}>{e}</option>
        })
      }



    </select>
  )
}

export default SelectComp