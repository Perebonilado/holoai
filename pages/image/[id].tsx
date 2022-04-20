import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import Navbar from '../../components/Navbar';
import styles from './styles.module.css'



const ImagePage = ({posts}:any) => {
  const router = useRouter()
  const { id } = router.query 

  const [post, setPost] = useState<any>(null)

  useEffect(()=>{
    if(posts)setPost(posts.filter((item:any)=>item.id==id)[0])
  }, [posts])
  
  return (
    <>
    <Navbar />
    <div className={styles.container}>

    {post && 
      <div>
        <img src={post?.image_url.large} alt="pic" />
        <p>{post.text}</p>
      </div>
    }
    
    </div>

    </>
  )
}

export async function getServerSideProps() {

  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/request_sample`)
  const data = await res.json()
  const posts = data?.data

  // Pass data to the page via props
  return { props: { posts } }
}

export default ImagePage