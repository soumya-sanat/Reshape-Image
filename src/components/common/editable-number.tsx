import React, { useState, useRef, useEffect } from 'react';

type EditableNumberProps = {
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
  className?: string;
  ending?: string;
};

const EditableNumber: React.FC<EditableNumberProps> = ({
  value,
  min,
  max,
  onChange,
  className,
  ending = 'unit'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const commitValue = () => {
    const num = Number(tempValue);
    if (!isNaN(num) && num >= min && num <= max) {
      onChange(num);
    } else {
      setTempValue(value); // revert if invalid
    }
    setIsEditing(false);
  };

  return isEditing ? (
    <input
      ref={inputRef}
      type="number"
      value={tempValue}
      min={min}
      max={max}
      className={`w-16 border border-gray-300  px-1 text-right font-semibold text-blue-700 rounded-none ${
        className || ''
      }`}
      onChange={(e) => setTempValue(Number(e.target.value))}
      onBlur={commitValue}
      onKeyDown={(e) => {
        if (e.key === 'Enter') commitValue();
        if (e.key === 'Escape') {
          setTempValue(value);
          setIsEditing(false);
        }
      }}
    />
  ) : (
    <span
      className={`w-16 text-right font-semibold text-accent-foreground cursor-pointer ${
        className || ''
      }`}
      onClick={() => setIsEditing(true)}
    >
      {value} {ending}
    </span>
  );
};

export default EditableNumber;
