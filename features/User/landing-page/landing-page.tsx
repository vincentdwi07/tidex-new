import FooterSection from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar";
import BackgroundSection from "./Components/Background/Background";
import CertificatesSection from "./Components/Certificate/Certificate";
import Hero from "./Components/Hero/Hero";
import PartnersSection from "./Components/Partner/Partner";
import ProjectsSection from "./Components/Projects/Projects";
import ServicesSection from "./Components/Services/Service";
import ValuesSection from "./Components/Value/Value";

const LandingPage = () => {
    return (
        <>
            <main >
                <Navbar />
                <Hero />
                <PartnersSection/>
                <ServicesSection/>
                <BackgroundSection/>
                <ValuesSection/>
                <ProjectsSection/>
                <CertificatesSection/>
                <FooterSection/>
            </main>
        </>
    );
};

export default LandingPage;