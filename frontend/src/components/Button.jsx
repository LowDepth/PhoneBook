function Button({ onClick, text, type = "button", className = "" }) {
  return (
    <button
      type={type}
      className={`btn btn-primary me-2 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
