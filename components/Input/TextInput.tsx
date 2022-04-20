import React from 'react'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   
}

const TextInput:React.FC<TextInputProps> = ({...props}) => {
  return (
    <input  {...props}/>
  )
}

export default TextInput