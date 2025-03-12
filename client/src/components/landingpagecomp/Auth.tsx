import { useDispatch } from "react-redux"
import { storeDispatchType } from "../../store/store"
import { modalActions } from "../../store/modal"
import { Button } from "@mui/material"
import { useState } from "react"
import { loginCollaborator, loginYoutuber, registerCollaborator, registerYoutuber } from "../../fetch/fetch"
import { WebsiteLogo } from "../websitelogo/websitelogo"

import { useNavigate } from "react-router-dom"
import AuthLoader from "../loader/auth.loader"
import toast from "react-hot-toast"


export const LoginBox = () => {
    const dispatch: storeDispatchType = useDispatch()
    const [role, setRole] = useState<string>("youtuber")
    const [roleSymbol, setRoleSymbol] = useState<string>("🐺")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()


    const login = async () => {
        const data = { email, password, role }

        if (!data.email || !data.password) {
            toast.error("Please fill all fields")

            return
        }
        setLoading(true)

        if (data.role === "youtuber") {
            const resData = await loginYoutuber(data)
            setLoading(false)

            if (resData.success) {
                dispatch(modalActions.closeModal())
                toast.success(resData.message)
                navigate("/y/" + resData.data.user.username+"/home")
            }
            else {
                toast.error(resData.message)
            }

        }
        else if (data.role === "collaborator") {
            const resData = await loginCollaborator(data)
            setLoading(false)

            if (resData.success) {
                dispatch(modalActions.closeModal())
                toast.success(resData.message)
                navigate("/c/" + resData.data.user.username+"/home")
            }
            else {
                toast.error(resData.message)
            }
        }


    }

    const handleClick = () => {
        dispatch(modalActions.closeModal())
        dispatch(modalActions.openMoal({
            buttons: false,
            submitText: "Sign up",
            title: "",
            content: <SignUpBox />,
        }))
    }
    return (<div className="flex flex-col gap-6 py-2">
        <h1 className="text-lg sm:text-xl bg-clip-text text-transparent font-semibold tracking-tight 
                      text-center animate-gradient bg-[length:200%_200%] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 pb-5">{`Login as a ${role} ${roleSymbol}`}</h1>

        <div className="flex flex-col gap-4">
            <span className="flex justify-between">
                <p>Youtuber</p>
                <input type="radio" name="radio-8" onClick={() => {
                    setRole("youtuber")
                    setRoleSymbol("🐺")
                }} checked={role === "youtuber"} className="radio radio-info" />
            </span>

            <span className="flex justify-between">
                <p>Collaborator</p>
                <input type="radio" name="radio-8" onClick={() => {
                    setRole("collaborator")
                    setRoleSymbol("🗿")
                }} checked={role === "collaborator"} className="radio radio-warning" />
            </span>
        </div>

        <label className="input input-bordered flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="grow" placeholder="Email" />
        </label>

        <label className="input input-bordered flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
            </svg>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="grow" placeholder="password" />
        </label>
        <Button disabled={loading} onClick={login} variant="outlined">
            <div className="flex gap-2 justify-center items-center">
                {loading ?
                    <>
                        <AuthLoader />
                        {/* <TwoTxtLoader txtArr={["Logging", "You in..."]} /> */}
                    </> :
                    <>
                        <WebsiteLogo noText />
                        <p>{`${loading ? "Logging..." : "Login"}`}</p>
                    </>}
            </div>
        </Button>
        <p className="text-sm text-center">Don't have an account? <span onClick={handleClick} className="text-accent cursor-pointer">Sign Up </span></p>
    </div>)
}

export const SignUpBox = () => {
    const dispatch: storeDispatchType = useDispatch()
    const [role, setRole] = useState<string>("youtuber")
    const [roleSymbol, setRoleSymbol] = useState<string>("🐺")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleClick = () => {
        dispatch(modalActions.closeModal())

        dispatch(modalActions.openMoal({
            buttons: false,
            submitText: "Login",
            title: "",
            content: <LoginBox />
        }))
    }

    const register = async () => {
        const data = { email, password, role, username }
        if (!data.email || !data.password || !data.username) {
            toast.error("Please fill all fields")
            return
        }
        setLoading(true)

        if (data.role === "youtuber") {
            const resData = await await registerYoutuber(data)
            setLoading(false)

            if (resData.success) {
                dispatch(modalActions.closeModal())
                toast.success(resData.message)

                navigate("/y/" + resData.data.user.username+"/home")
            }
            else {
                toast.error(resData.message)
            }
        }
        else if (data.role === "collaborator") {

            const resData = await registerCollaborator(data)
            setLoading(false)

            if (resData.success) {
                dispatch(modalActions.closeModal())
                toast.success(resData.message)

                navigate("/c/" + resData.data.user.username+"/home")
            }
            else {
                toast.error(resData.message)
            }
        }


    }

    return (<div className="flex flex-col gap-4 p-2">
        <h1 className="text-lg sm:text-xl bg-clip-text text-transparent font-semibold tracking-tight pb-5
                      text-center animate-gradient bg-[length:200%_200%] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">{`Register as a ${role} ${roleSymbol}`}</h1>

        <div className="flex flex-col gap-4">
            <span className="flex justify-between">
                <p>Youtuber</p>
                <input type="radio" name="radio-8" onClick={() => {
                    setRole("youtuber")
                    setRoleSymbol("🐺")
                }} checked={role === "youtuber"} className="radio radio-info radio-sm" />
            </span>

            <span className="flex justify-between">
                <p>Collaborator</p>
                <input type="radio" name="radio-8" onClick={() => {
                    setRole("collaborator")
                    setRoleSymbol("🗿")
                }} checked={role === "collaborator"} className="radio radio-warning radio-sm" />
            </span>
        </div>

        <label className="input input-bordered flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="grow" placeholder="Email" />
        </label>
        <p className="text-label text-xs sm:text-sm opacity-60" >Username must be 3-15 characters long</p>
        <label className="input input-bordered flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="grow" placeholder="Username" />
        </label>

        <div className="flex flex-col gap-2">
            <p className="text-label text-xs sm:text-sm opacity-60" >Password must be 3-30 characters long.
                Both username & password should only contain alphanumeric characters</p>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd" />
                </svg>

                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="grow" placeholder="password" />
            </label>
        </div>


        <Button disabled={loading} onClick={register} variant="outlined">
            <div className="flex gap-2 justify-center items-center">
                {loading ? <AuthLoader /> : <>
                    <WebsiteLogo noText />
                    <p>{`${loading ? "Registering..." : "Sign Up"}`}</p>
                </>}
            </div>
        </Button>


        <p className="text-sm text-center">Already have an account? <span onClick={handleClick} className="text-accent cursor-pointer">Log in</span></p>
    </div>)
}