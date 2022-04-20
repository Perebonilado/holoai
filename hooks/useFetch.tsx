import { useEffect, useState } from "react"

interface useFetchOptions {
    queryFn : Function;
    enabled?: boolean;
    queryOptions?: [string, any]
}

const useFetch = ({queryFn, enabled=false, queryOptions}:useFetchOptions) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const refetch = async () => {
        setLoading(true)
        const result = await queryFn(queryOptions);
        setLoading(false)

        if (!result?.ok) return setError(result?.originalError.message);
        return setData(result?.data);

    }

    useEffect(()=>{
        if(enabled)refetch()
    }, [enabled])
    
    return { data, loading, error, refetch };
}

export default useFetch