import { Header } from "../components/landingpagecomp/header"
import { HeroSection } from "../components/landingpagecomp/hero"

export const LandingPage: React.FC = () => {
    return (
        <main className="min-h-screen bg-black">
            <Header />
            <HeroSection />
        </main>
    )
}


