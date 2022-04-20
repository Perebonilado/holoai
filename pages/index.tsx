import type { NextPage } from 'next'
import CardContainer from '../components/CardContainer'
import Navbar from '../components/Navbar'
import SubNav from '../components/SubNav'
import styles from './HomePageStyles.module.css'
import { useEffect, useState } from 'react'
import { sort, filterApproved, handleUndo } from '../utils'
import Button from '../components/Button'
import Loader from '../components/Loader'
import { AppContext, AppTypes } from '../context/AppContext'
import React from 'react'
import useFetchData from '../hooks/useFetchData'


const Home: NextPage = () => {

  const [ postsData, setPostsData ] = useState<any>(null)
  const [ approvedPosts, setApprovedPosts ] = useState(null)
  const [approveFilter, setApproveFilter] = useState<boolean>(false)
  const [scoreAscending, setScoreAscending] = useState<boolean>(false)
  const [scoreDescending, setScoreDescending] = useState<boolean>(false)
  const selectedArr:any = []

  const { history, setHistory, setCurrentHistoryPosition, currentHistoryPosition } = React.useContext(AppContext) as AppTypes
 
  const posts = useFetchData({
    enabled: true
  })
  
  // setting posts Data
  useEffect(()=>{
    setPostsData(posts?.data?.data)
  }, [posts?.data !== null])

  // setting the filter functions if post data is available
  useEffect(()=>{
    if(postsData !== null) {
      setApprovedPosts(filterApproved(postsData))
    }
  },[postsData])

  const shortCutFunction = (e:KeyboardEvent) => {
    if(e.key == 'a')
    {
      const saveToHistory = () => {
        let postsArrCopy = [...postsData]
        let changes:any = []
        
        for (let i = 0; i < selectedArr.length; i++) {
          
          for (let j = 0; j < postsArrCopy.length; j++) {
            if(postsArrCopy[j].id === selectedArr[i]){
              
            //push item to history, keep track of position in the history stack and the type of action done
            const itemChanged = postsArrCopy[j];
            const actionDone = { actionType: 'EDIT', itemIndex: postsData.indexOf(itemChanged) }
            changes.push([ itemChanged, actionDone ])
          }
        }
        
      }
      setHistory([...history, ...changes])
      if(history.length >= 1) setCurrentHistoryPosition(currentHistoryPosition + changes.length)
      else if (history.length === 0) setCurrentHistoryPosition(changes.length-1)
      }
      
      saveToHistory()

      setPostsData(postsData.map((item:any)=>selectedArr.includes(item.id) ? {...item, isApproved: true} : item))
    }

    else if(e.key == 'd')
    {
      let recursDel = function DelItem(){
        let newPostData:any = [...postsData]
        
        const fact =(n:any=0):any => {
          if(n===postsData.length){
            
           return newPostData
          }
          else{
            for (let i = 0; i < selectedArr.length; i++) {
              if(selectedArr[i] === postsData[n].id){
                newPostData.splice(newPostData.indexOf(postsData[n]), 1)
                setPostsData(newPostData)
              }
            }
            return fact(n+1)
          }

        }
        return fact()
      }()

      setPostsData(recursDel)
    }
  }

// event listener for shortcuts
  useEffect(()=>{
    document.addEventListener('keydown', shortCutFunction) 

    return ()=>document.removeEventListener('keydown', shortCutFunction)
  })

  return (
    <div>
      <Navbar />
      <section className={styles.container}>
      <SubNav
      handleUndo={()=>handleUndo(history, currentHistoryPosition, setPostsData, postsData, setCurrentHistoryPosition)} 
      approveFilter={approveFilter}
      setApproveFilter={setApproveFilter}
      scoreAscending={scoreAscending}
      setScoreAscending={setScoreAscending}
      scoreDescending={scoreDescending}
      setScoreDescending={setScoreDescending}
      />
      {posts?.data !== null && posts?.data?.data !==null && <CardContainer
      selectedArr={selectedArr}  
      loading={posts?.loading}
      data={approveFilter === false ? sort(postsData, scoreAscending, scoreDescending) : sort(approvedPosts, scoreAscending, scoreDescending)}
      setData={setPostsData}
      />}
      {posts?.data !==null && posts?.data?.error&& <Button color='green' text='Refetch' onClick={()=>posts?.refetch()}/>}
      {posts?.loading && !posts?.data && <Loader />}
      </section>
    </div>
  )
}

export default Home
