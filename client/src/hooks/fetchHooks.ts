import { useEffect, useState } from "react"


export const useFetch = <T>(fnc: (...args : any) => Promise<any>) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<T | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            fnc().then((res: { data: T, success: boolean, message: string }) => {

                console.log(res)
             
                if (res.success)
                    setData(res.data);
                else
                    setError(res.message)
                setLoading(false)
            })
                .catch((err: any) => {
                    setError(err.message)
                    setLoading(false)
                }
                )
        }

        fetchData()

    }, [fnc])

    return {
        data,
        loading,
        error
    }
}