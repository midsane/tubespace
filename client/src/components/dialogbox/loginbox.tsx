import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogDescription } from "@radix-ui/react-dialog"
import { ChromeIcon } from "lucide-react"
import { useState } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserRole, type AuthDataType, type httpRequstType } from "@/types/types"
import { LoginUser, RegisterUser } from "@/httpfnc/auth"
import { useNavigate } from "react-router-dom"

export function LoginBox() {
  const [loginBox, setLoginBox] = useState<boolean>(false)
  const [data, setData] = useState({ email: "", password: "", role: UserRole.YOUTUBER })
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      if (loginBox) {

        const userData: AuthDataType = await LoginUser(data.email, data.password)
        setLoading(false)
        navigate(`/profile/${userData.name}`);
      } else {
        const userData: AuthDataType = await RegisterUser(data.email, data.password, data.role);
        setLoading(false)
        navigate(`/profile/${userData.name}`);
      }

    } catch (error) {
      setLoading(false)
      console.error("Error during submission:", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{loginBox ? "Login" : "Signup"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{loginBox ? "Login" : "Signup"}</DialogTitle>
            <DialogDescription>
              {loginBox ? "Don't have an account? go to " : "Already have an account? go to "}
              <a
                onClick={() => setLoginBox(!loginBox)}
                className="text-blue-500 cursor-pointer dark:text-blue-300 font-semibold">
                {loginBox ? "Signup" : "Login"}
              </a>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-4">
            {!loginBox && (
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem
                      onClick={() => setData(prev => ({ ...prev, role: UserRole.YOUTUBER }))}
                      value="Youtuber"
                    >
                      Youtuber
                    </SelectItem>
                    <SelectItem
                      onClick={() => setData(prev => ({ ...prev, role: UserRole.EDITOR }))}
                      value="Editor"
                    >
                      Editor
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}

            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                disabled={loading}
                value={data.email}
                onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                disabled={loading}
                value={data.password}
                onChange={(e) => setData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your password"
              />
            </div>

            <Button disabled={loading} variant="outline" className="w-full">
              <ChromeIcon />
              <p>{loginBox ? "Login with Google" : "Signup with Google"}</p>
            </Button>
          </div>

          <DialogFooter>
            <Button disabled={loading} type="submit">
              {loginBox ? (loading ? "Logging you in..." : "Login") : (loading ? "Signing you up..." : "Signup")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

  )
}
