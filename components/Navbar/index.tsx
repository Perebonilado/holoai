import React from 'react'
import styles from './styles.module.css'
import Header from '../Header'
import Link from 'next/link'

const Navbar:React.FC = () => {

  return (
    <>
    <Header />
    <nav className={styles.container}>
      <Link href={'/'} passHref>
      <h1>
        HoloAi
      </h1>
      </Link>

    </nav>
    </>
  )
}

export default Navbar