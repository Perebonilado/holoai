import React from 'react'
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
 
}

const Checkbox:React.FC<Props> = ({...props}) => {
  return (
    <input  type={'checkbox'} {...props}/>
  )
}

export default Checkbox