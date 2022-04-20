import React, { SetStateAction } from 'react'
import styles from './styles.module.css'
import Filter from '../Filter'
import { useState } from 'react'

interface Props {
  approveFilter: boolean;
  setApproveFilter: React.Dispatch<SetStateAction<boolean>>;
  scoreAscending: boolean;
  setScoreAscending: React.Dispatch<SetStateAction<boolean>>;
  scoreDescending: boolean;
  setScoreDescending: React.Dispatch<SetStateAction<boolean>>;
  handleUndo: any;
}

const SubNav:React.FC<Props> = ({
  approveFilter, 
  setApproveFilter,
  scoreAscending,
  setScoreAscending,
  scoreDescending,
  setScoreDescending,
  handleUndo
}) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  
  return (
    <div className={styles.container}>
        <div>
          <p onClick={handleUndo}>Undo</p>
        </div>
    <p className={styles.filterIcon} onClick={()=>setIsOpen(true)}> <i className={'fas fa-filter'}></i> </p>
    {isOpen && <Filter 
    setIsOpen={setIsOpen} 
    approveFilter={approveFilter} 
    setApproveFilter={setApproveFilter}
    scoreAscending={scoreAscending}
    setScoreAscending={setScoreAscending}
    scoreDescending={scoreDescending}
    setScoreDescending={setScoreDescending}
    />}
      
    </div>
  )
}

export default SubNav