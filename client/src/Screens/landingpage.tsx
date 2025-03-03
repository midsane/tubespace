import { Footer } from "../components/footer"
import { Header } from "../components/landingpagecomp/header"
import { HeroSection } from "../components/landingpagecomp/hero"

export const LandingPage: React.FC = () => {
    return (
        <main className="min-h-[100dvh] bg-black">
            <Header />
            <HeroSection />
            <Footer />
        </main>
    )
}


