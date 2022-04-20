import React from 'react'
import styles from './styles.module.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    color?: 'red'|'green';
}

const Button:React.FC<Props> = ({text='', color='green', ...props}) => {
  return (
    <button className={styles.button} style={{backgroundColor: color}} {...props}> 
        {text}
    </button>
  )
}

export default Button