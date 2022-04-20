import { useEffect, useState } from "react"

const useFetchData = ({enabled=false}:{enabled?: boolean}) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const refetch = async () => {
        setLoading(true)
        await fetch('/api/request_sample')
        .then((data)=>data.json())
        .then((data)=>{
            setLoading(false)
            setData(data)
        })
    }

    useEffect(()=>{
        if(enabled)refetch()
    }, [enabled])
    

    return { data, loading, refetch}
}

export default useFetchData