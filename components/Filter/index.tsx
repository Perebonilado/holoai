import React, { SetStateAction } from 'react'
import styles from './styles.module.css'
import { CheckBox } from '../Input'

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  approveFilter: boolean;
  setApproveFilter: React.Dispatch<SetStateAction<boolean>>
  scoreAscending: boolean;
  setScoreAscending: React.Dispatch<SetStateAction<boolean>>;
  scoreDescending: boolean;
  setScoreDescending: React.Dispatch<SetStateAction<boolean>>
}

const Filter:React.FC<Props> = ({ 
  setIsOpen, 
  approveFilter=false, 
  setApproveFilter,
  scoreAscending = false,
  setScoreAscending,
  scoreDescending = false,
  setScoreDescending
 }) => {


  return (
    <div className={styles.container}>

      <p onClick={()=>setIsOpen(false)}>&times;</p>
      <p>Filter by</p>

      <div>
        <p>Approved: <CheckBox checked={approveFilter} onChange={()=>setApproveFilter(!approveFilter)}/></p>
        <p>Score: ascending <CheckBox 
        checked={scoreAscending}
        onChange={()=>{
          setScoreAscending(!scoreAscending)
          setScoreDescending(false)
        }}/> descending <CheckBox checked={scoreDescending} onChange={()=>{
          setScoreDescending(!scoreDescending)
          setScoreAscending(false)
          }}/></p>
      </div>
    </div> 
  )
}

export default Filter