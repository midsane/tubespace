import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChromeIcon } from "lucide-react"
import { useState } from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { UserRole, type AuthDataType } from "@/types/types"
import { LoginUser, RegisterUser } from "@/httpfnc/auth"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "@/store/user.store"

export function AuthPage() {
    const [loginBox, setLoginBox] = useState<boolean>(false)
    const [data, setData] = useState({ email: "", password: "", role: UserRole.NORMAL })
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const setState = useUserStore((state) => state.setState)

    console.log(data)
    const handleSubmit = async () => {
        if (data.role === UserRole.NORMAL && !loginBox) {
            alert("Please select a role")
            return;
        }
        if (!data.email || !data.password || data.email?.trim() === "" || data.password?.trim() === "") {
            alert("Please fill all fields")
            return;
        }
        if (!data.email.includes("@") || !data.email.includes(".")) {
            alert("invalid email format")
            return;
        }
        setLoading(true)
        try {
            if (loginBox) {

                const userData: AuthDataType = await LoginUser(data.email, data.password)
                setLoading(false)
                setState(userData)
                const prefix = userData.role === UserRole.YOUTUBER ? "y" : "c";
                navigate(`/${prefix}/profile/${userData.name}`);
            } else {
                const userData: AuthDataType = await RegisterUser(data.email, data.password, data.role);
                setLoading(false)
                setState(userData)
                const prefix = userData.role === UserRole.YOUTUBER ? "y" : "c";
                navigate(`/${prefix}/profile/${userData.name}`);
            }

        } catch (error) {
            setLoading(false)
            console.error("Error during submission:", error);
        }
    }

    return (
        <div className="h-dvh w-full bg mix-blend-hard bg-background
        bg-[radial-gradient(circle_at_center,theme(colors.chart-bg)_10%,transparent_80%)] flex items-center justify-center">
            <Card className="w-full max-w-sm ">
                <CardHeader>
                    <CardTitle>{loginBox ? "Login" : "Signup"}</CardTitle>
                    <CardDescription>
                        {loginBox ? "Don't have an account? go to " : "Already have an account? go to "}
                        <a
                            onClick={() => setLoginBox(!loginBox)}
                            className="text-blue-500 cursor-pointer dark:text-blue-300 font-semibold">
                            {loginBox ? "Signup" : "Login"}
                        </a>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!loginBox && (
                        <Select
                            onValueChange={(val) => {
                                setData((prev) => ({
                                    ...prev,
                                    role: val as UserRole, // cast string to enum
                                }));
                            }}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Role</SelectLabel>
                                    <SelectItem value={UserRole.YOUTUBER}>Youtuber</SelectItem>
                                    <SelectItem value={UserRole.EDITOR}>Editor</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}

                    <br />
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    disabled={loading}
                                    value={data.email}
                                    onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password"
                                    disabled={loading}
                                    value={data.password}
                                    onChange={(e) => setData(prev => ({ ...prev, password: e.target.value }))}
                                    placeholder="Enter your password"
                                    required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button onClick={handleSubmit} disabled={loading} type="submit" className="w-full">
                        {loginBox ? (loading ? "Logging you in..." : "Login") : (loading ? "Signing you up..." : "Signup")}
                    </Button>
                    <Button disabled={loading} variant="outline" className="w-full">
                        <ChromeIcon />
                        <p>{loginBox ? "Login with Google" : "Signup with Google"}</p>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )

}
