import { useEffect, useState } from "react"

export const useFetch = <T>(fnc: () => Promise<any>) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<T | null>(null)

    useEffect(() => {
        setLoading(true)
        fnc().then((res: T | any) => {
            setData(res);
            setLoading(false)
        })
            .catch((err: any) => {
                setError(err.message)
                setLoading(false)
            }
            )
    }, [fnc])

    return {
        data,
        loading,
        error
    }
}