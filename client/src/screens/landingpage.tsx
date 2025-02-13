import { Header } from "../components/landingpagecomp/header"
import { HeroSection } from "../components/landingpagecomp/hero"
import { Footer } from "../components/footer"
export const LandingPage: React.FC = () => {
    return (
        <main className="min-h-screen bg-black">
            <Header />
            <HeroSection />
            <Footer/>
        </main>
    )
}


