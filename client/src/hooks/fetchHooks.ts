import { useEffect, useState } from "react"
import { storeDispatchType } from "../store/store"
import { useDispatch } from "react-redux"
import { thirdPersonActions } from "../store/thirdperson.slice"
import { userRoleActions } from "../store/role.slice"
import { userRole } from "../types/youtuberTypes"


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

                    if ("user" in (res.data as any) && (res.data as any).user?.role) {
                        const userRoleValue = (res.data as any).user.role === "collaborator"
                            ? userRole.COLLABORATOR
                            : userRole.YOUTUBER;
                        dispatch(userRoleActions.setRole(userRoleValue));
                    }

                    if ("role" in (res.data as any) && (res.data as any).role) {
                        const userRoleValue = (res.data as any).role === "collaborator"
                            ? userRole.COLLABORATOR
                            : userRole.YOUTUBER;
                        dispatch(userRoleActions.setRole(userRoleValue));
                    }
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