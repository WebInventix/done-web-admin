import "./button.css"
function CustomButton({ children, style, onClick, disable }) {
  return (
    <button
      className="primary-btn"
      disabled={disable}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default CustomButton
