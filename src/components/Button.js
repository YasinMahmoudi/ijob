const buttonStyel = {
  cursor: 'pointer',
  outline: 'none',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: '0',
};

function Button({ children, className = '', onClick }) {
  return (
    <button className={className} style={buttonStyel} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
