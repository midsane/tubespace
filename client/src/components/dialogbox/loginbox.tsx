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

export function LoginBox() {
  const [loginBox, setLoginBox] = useState<boolean>(false)
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">{loginBox ? "Login" : "Signup"}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
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
          <div className="grid gap-4">
            {!loginBox && <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="Youtuber">Youtuber</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>}

            <div className="grid gap-3">
              <Label htmlFor="name-1">email</Label>
              <Input id="name-1" name="email" placeholder="enter your email" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">password</Label>
              <Input type="password" id="username-1" name="password" placeholder="enter your password" />
            </div>
            <Button variant="outline" className="w-full">
              <ChromeIcon />
              <p>{loginBox ? "Login with Google" : "Signup with Google"}</p>
            </Button>
          </div>
          <DialogFooter>
            <Button type="submit">{loginBox ? "Login" : "Signup"}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
