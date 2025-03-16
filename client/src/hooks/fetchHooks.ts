import { useEffect, useState } from "react"
import { storeDispatchType } from "../store/store"
import { useDispatch } from "react-redux"
import { thirdPersonActions } from "../store/thirdperson.slice"


export const useFetch = <T>(fnc: (...args: any) => Promise<any>) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<T | null>(null)
    const dispatch: storeDispatchType = useDispatch()

    useEffect(() => {
        dispatch(thirdPersonActions.setVal(true))
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            fnc().then((res: { data: T, success: boolean, message: string, thirdPerson?: boolean }) => {

                if (res.success) {
                    setData(res.data);
                    dispatch(thirdPersonActions.setVal(res.thirdPerson || false))
                }

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