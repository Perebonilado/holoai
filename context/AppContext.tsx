import React, { useState } from "react"

export type AppTypes = {
    history: any;
    setHistory: React.Dispatch<any>;
    currentHistoryPosition: number;
    setCurrentHistoryPosition: React.Dispatch<React.SetStateAction<number>>;
}

export const AppContext = React.createContext<AppTypes | null>(null)

export const AppProvider:React.FC = ({children}) => {
    
    const [ history, setHistory ] = useState<any>([])
    const [currentHistoryPosition, setCurrentHistoryPosition] = useState<number>(0)
    
    return (
        <AppContext.Provider value={{
            history,
            setHistory,
            currentHistoryPosition,
            setCurrentHistoryPosition,
            }}>
            {children}
        </AppContext.Provider>
    )
}