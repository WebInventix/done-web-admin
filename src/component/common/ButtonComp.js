// import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { themeOrange } from "../../utils/colorTheme";
import LoadingButton from '@mui/lab/LoadingButton';

const ButtonComp = (props) => {
  const {
    label,
    onClick,
    style,
    color,
    disabled,
    loading,
    type,
    backgroundColor,
    hover,
    className,
  } = props;
  const [hovering, setHovering] = useState();
  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => setHovering(false);
  const bgColor =
    hover && hovering ? hover : backgroundColor ? backgroundColor : themeOrange;

  return (
    <>
      <LoadingButton
        loading={loading}
        type={type}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={className}
        style={{
          padding: "10px",
          textTransform: "none",
          borderRadius: "20px",
          border: "none",
          color: color ? color : "white",
          backgroundColor: disabled ? "lightgray" : bgColor,
          cursor: "pointer",
          ...style,
        }}
        disabled={disabled}
      >
        {label}
      </LoadingButton>
    </>
  );
};

export default ButtonComp;
