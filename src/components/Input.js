import { useRef, useState } from 'react';
import useKey from '../hooks/useKey';

function Input({
  id = '',
  bgColor = '#110505',
  textColor = '#f1f1f1',
  minWidth = '25rem',
  borderRadius = '',
  inputType = 'text',
  placeHolder = 'Type something ...',
  className = '',
  onGetValue,
}) {
  const inputStyle = {
    width: minWidth,
    border: 'none',
    outline: 'none',
    borderRadius: borderRadius,
    padding: '.75rem 1.5rem',
    background: bgColor,
    color: textColor,
    fontSize: '1.4rem',
  };

  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  useKey('Enter', function () {
    if (document.activeElement === inputRef.current) return;

    inputRef.current.closest('.search')?.focus();
    setValue('');
  });

  // prettier-ignore
  const valid = ['text','color','date','datetime-local','email','number','password','search','tel','time','week']

  if (!valid.includes(inputType))
    throw new Error('Invalid input type for this component !');

  function handleValue(e) {
    setValue(e.target.value);
    onGetValue && onGetValue(e.target.value);
  }

  return (
    <>
      <input
        type={inputType}
        style={inputStyle}
        className={className}
        placeholder={placeHolder}
        value={value}
        onChange={handleValue}
        ref={inputRef}
        id={id}
      />
      <style>
        {`
            ::placeholder {
                color:rgba(${textColor} , .4);
        }`}
      </style>
    </>
  );
}

export default Input;
