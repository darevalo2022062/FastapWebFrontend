import { Navbar, Footer } from "../../components/layout"
import { HeroSection, MissionSection, VisionSection } from "./components";
import useDocumentTitle from "../../utils/useDocumentTitle"

const AboutPage = () => {
    useDocumentTitle("FasTap | Nosotros ");

    return (
        <>
            <Navbar />
            <HeroSection />
            <MissionSection />
            <VisionSection />
            <Footer />
        </> 
    )
}

export default AboutPage