import {motion} from "framer-motion"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
export function GetStartedButton() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
            <Button
                asChild
                className="group relative border-border border-2 h-12 px-6 rounded-2xl text-base font-semibold bg-background text-foreground hover:bg-chart-4 shadow-lg transition-all duration-300 hover:scale-[1.03]"
                size="lg"
            >
                <Link to="/auth">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </Button>
        </motion.div>
    )
}