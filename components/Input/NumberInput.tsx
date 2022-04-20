import React from 'react'

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    value: number;
}

const NumberInput:React.FC<NumberInputProps> = ({value, ...props}) => {
  return (
    <input type="number" min={0} max={5} {...props} value={value}/>
  )
}

export default NumberInput