import React, { Dispatch, useState } from 'react'
import styles from './styles.module.css'
import Card from '../Card'
import Loader from '../Loader';
import { AppContext, AppTypes } from '../../context/AppContext'

interface Props {
  data: any;
  loading: boolean;
  setData: Dispatch<any>,
  selectedArr: any
}


const CardContainer:React.FC<Props>  = ({data, loading, setData, selectedArr}) => {
  
  const { history, setHistory, setCurrentHistoryPosition, currentHistoryPosition } = React.useContext(AppContext) as AppTypes

  const handleApprove = (id:any) => {
    //push item to history, keep track of position in the history stack and the type of action done
    const itemChanged = data.filter((item:any)=>item.id===id)[0];
    const actionDone = { actionType: 'EDIT', itemIndex: data.indexOf(itemChanged) }
    setHistory([...history, [ itemChanged, actionDone ]])

    // THE ACTUAL CHANGE
    setData(data.map((item:any)=>item.id===id ? {...item, isApproved: true} : item))
    if(history.length >= 1) setCurrentHistoryPosition(currentHistoryPosition + 1)
  }


  const handleDelete = (id:any) => {
    setData(data.filter((item:any)=>item.id !== id))
  }


  return (
    <section className={styles.container}>
      {!loading && (data===null ? '' : data?.map((item:any)=>{
    
        return <Card 
        key={item.id} 
        imgSrc={item.image_url.thumbnail}
        text={item.text}
        score={item.score}
        isApproved={item.isApproved}
        handleApprove={()=>handleApprove(item.id)}
        handleDelete={()=>handleDelete(item.id)}
        data={data}
        id={item.id}
        setData={setData}
        selectedArr={selectedArr}
        />
      }))}
      {loading && <Loader />}
    </section>
  )
}

export default CardContainer