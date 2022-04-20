export const sort = (data:any, scoreAscending: boolean, scoreDescending: boolean) => {
    if(scoreAscending){
        return (
             data?.sort((a:any,b:any)=>{
                return b.score - a.score 
            })
        )
    }

    else if(scoreDescending) {
        return (
            data?.sort((a:any,b:any)=>{
                return a.score - b.score 
            })
        )
    }

    else return data

}

export const filterApproved = (data:any) => {
    return data?.filter((item:any)=>item.isApproved === true) 
}

export const alterData = (data:any) => {
    return data.map((item:any, index:any)=>{
        // rename keys in object
        item['text'] = item['name'];
        item['image_url'] = item['picture'];
        item['score'] = 0;
        item['isApproved'] = false
        
        // 
        item['text'] = `${item?.name?.first} ${item?.name?.last}`
        item['id'] = index+1

        // delete unwanted keys
        delete item['picture']
        delete item['name']
        delete item['cell']
        delete item['dob']
        delete item['email']
        delete item['gender']
        delete item['location']
        delete item['login']
        delete item['nat']
        delete item['phone']
        delete item['registered']

        return item
      })
    
}

export const handleUndo = (
    history:any, 
    currentHistoryPosition:any,
    setPostsData: any,
    postsData:any,
    setCurrentHistoryPosition:any
    ) => {
    // check if theres something in the history stack
    if(history[0] !== undefined) {
        // Get the item based on the last change made
        const lastChange = history[currentHistoryPosition]
  
        // check for the type of change made, if its an edit
        if(lastChange[1].actionType === 'EDIT'){
          // if its an edit then map through the data and replace the item
          const editedItem = lastChange[0]
          setPostsData(postsData.map((item:any)=>item.id === editedItem.id ? item = editedItem : item))
  
          // Change the position to track the next undo
          if(currentHistoryPosition > 0)setCurrentHistoryPosition(currentHistoryPosition - 1)
          history.pop()
        }
      }
      else console.log('No History')
}

