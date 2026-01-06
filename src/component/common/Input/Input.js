import "./input.css";

const Input = ({
  onChange,
  placeholder,
  style,
  id,
  defaultValue,
  disabled,
  pattern,
  type,
  value,
}) => {
  return (
    <input
      className="input"
      style={{ ...style }}
      value={value}
      disabled={disabled}
      onChange={onChange}
      defaultValue={defaultValue}
      placeholder={placeholder && placeholder}
      id={id}
      pattern={pattern}
      type={type}
    />
  );
};

export default Input;
