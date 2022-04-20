import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import Button from '../Button'
import { TextInput, NumberInput } from '../Input'
import Link from 'next/link';
import { AppContext, AppTypes } from '../../context/AppContext';
import Checkbox from '../Input/Checkbox';


interface Props {
  imgSrc?: string;
  text?: string;
  score: number;
  isApproved?: boolean;
  handleApprove?: any;
  handleDelete?: any;
  isEditText?: boolean;
  handleEditChange?: any;
  data?: any;
  id?: any;
  setData?: React.Dispatch<any>;
  selectedArr: any
}

const Card: React.FC<Props> = ({
  imgSrc,
  text,
  score,
  isApproved,
  handleApprove,
  handleDelete,
  data,
  setData,
  id,
  selectedArr
}) => {

  const [editTextValue, setEditTextValue] = useState<string>(text || '')
  const [isEditText, setIsEditText] = useState<boolean>(false)
  const [editScoreValue, setEditScoreValue] = useState<number>(score || 0)
  const [isEditScore, setIsEditScore] = useState<boolean>(false)
  const [ selected, setSelected ] = useState<boolean>(false)

  const { history, setHistory, setCurrentHistoryPosition, currentHistoryPosition } = React.useContext(AppContext) as AppTypes
  
  const handleEditTextSubmit = (id:any) => {
    //push item to history, keep track of position in the history stack and the type of action done
    const itemChanged = data.filter((item:any)=>item.id===id)[0];
    const actionDone = { actionType: 'EDIT', itemIndex: data.indexOf(itemChanged) }
    setHistory([...history, [ itemChanged, actionDone ]])

    // THE ACTUAL CHANGE
    
    setData && setData(data.map((item:any)=>item.id === id ? {...item, text: editTextValue} : item))
    setEditTextValue(editTextValue || '')
    if(history.length >= 1) setCurrentHistoryPosition(currentHistoryPosition + 1)

  }
  
  const handleEditScoreSubmit = (id:any) => {

    //push item to history, keep track of position in the history stack and the type of action done
    const itemChanged = data.filter((item:any)=>item.id===id)[0];
    const actionDone = { actionType: 'EDIT', itemIndex: data.indexOf(itemChanged) }
    setHistory([...history, [ itemChanged, actionDone ]])

    // THE ACTUAL CHANGE
    
    setData && setData(data.map((item:any)=>item.id === id ? {...item, score: editScoreValue} : item))
    if(history.length >= 1) {
      if(editScoreValue >=0 || editScoreValue<=5)  setCurrentHistoryPosition(currentHistoryPosition + 1)
    }
  }

  // Reset Selected after approving
  useEffect(()=>{
    if(isApproved===false) setSelected(false)
  }, [isApproved])

//  function to to handle shortcuts for toggles
  const handleToggleShortCuts = (e:KeyboardEvent) => {
    if(e.key == 't'){
      if(selected)
      {
        setIsEditText(!isEditText)
        setSelected(false)
      }
    }

    if(e.key == 's'){
      if(selected)
      {
        setIsEditScore(!isEditScore)
        setSelected(false)
      }
    }
  }

  // toggle edit state using shortcut
  useEffect(()=>{
    document.addEventListener('keydown', (e:KeyboardEvent)=>handleToggleShortCuts(e))

    return ()=>document.removeEventListener('keydown', (e:KeyboardEvent)=>handleToggleShortCuts(e))
  })

  return (
    <div className={styles.container} > 
      <div className={styles.detailsBox}>

    {isApproved === false && <Checkbox className={styles.checkBoxParent}  checked={selected} onChange={()=>{
      setSelected(!selected)
      // track the id of items selected to enable shortcut functions
      if(!selectedArr.includes(id))
      {      
        selectedArr.push(id)
      }

      else 
      {
        let index = selectedArr.indexOf(id)
        selectedArr.splice(index, 1)
      }
      }} />}

        <Link href={`/image/${id}`} passHref>

          <a target={'_blank'} rel='noopener noreferrer'>

          <img src={imgSrc || ''} alt="picture" className={styles.imageBox}/>

          </a>

        </Link>

          <div>
            <p style={{marginBottom: '1rem'}}>

              Text: {isEditText === true ? <TextInput onChange={(e)=>setEditTextValue(e.target.value.trimStart())} value={editTextValue || ''} className={styles.editBox} /> : <span>{text}</span>} 

              {isApproved === false && !isEditText && <span className={styles.editButton} onClick={()=>setIsEditText(true)}><i className={'fas fa-edit'}></i></span>}
              
              {isEditText && <Button className={styles.okButton} text='Ok' onClick={()=>{
                
                setIsEditText(false)
                
                if(editTextValue !== '') handleEditTextSubmit(id)
                
                if(!editTextValue) setEditTextValue(text || '')
             
             }}/>}
             
              </p>

            <p>Score: {isEditScore===true ? <NumberInput className={styles.scoreInput} value={editScoreValue} onChange={(e)=>setEditScoreValue(Number(e.target.value))}/> : <span>{score}</span>}
            
            {isApproved === false && !isEditScore && <span className={styles.editButton} onClick={()=>setIsEditScore(true)}><i className={'fas fa-edit'}></i></span>}
            
            {isEditScore && <Button className={styles.okButton} text='Ok' onClick={()=>{
                
                setIsEditScore(false)
               
                handleEditScoreSubmit(id)
              
              }}/>}
            
            </p>
          
          </div>
      
      </div>


      <div className={styles.buttonsContainer}>
          <div>
            
            {isApproved === false  && <Button text={'Approve' } onClick={()=>handleApprove()}/>}
            
            {isApproved === true && <p style={{color: 'lime'}}>Approved</p>}
          
          </div>
          
          <div>{isApproved===false &&<Button text='Delete' color='red' onClick={()=>handleDelete()}/>}</div>
      
      </div>
   
    </div>
  )
}

export default Card