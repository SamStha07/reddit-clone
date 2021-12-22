import React, { ChangeEvent } from 'react';
import classNames from 'classnames';

interface InputGroupProps {
  className?: string;
  type: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
  error,
  placeholder,
  setValue,
  type,
  value,
  className,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    return setValue(event.target.value);
  };
  return (
    <div className={className}>
      <input
        type={type}
        className={classNames(
          'w-full p-3 transition duration-200 border-gray-400 rounded outline-none bg-gray-50 focus:bg-white hover:bg-white',
          { 'border-red-500': error }
        )}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      <small className='font-medium text-red-600'>{error}</small>
    </div>
  );
};

export default InputGroup;
