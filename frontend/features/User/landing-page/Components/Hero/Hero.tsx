import FloatingLines from "@/components/FloatingLines";
import BlurText from "@/components/BlurText"
import ShinyText from "@/components/ShinyText"
import { Glassmorph } from "@/lib/constant/Glassmorph";
import { ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <main className="bg-black h-screen relative">
            <div className="absolute bottom-0 left-0 right-0 w-full bg-gradient-to-t from-black to-transparent h-[30%] z-2">tes</div>
            <FloatingLines 
                enabledWaves={["top", "middle", "bottom"]}
                lineCount={[10]}
                lineDistance={[10]}
                bendRadius={10}
                bendStrength={-0.5}
                interactive={false}
                parallax={false} 
                linesGradient={undefined}
                topWavePosition={undefined}
                middleWavePosition={undefined}
                animationSpeed={2}
            />
            <div className="max-w-[1400px] m-auto flex justify-start items-end h-full py-10 px-10 xl:px-0 relative z-3">
                <div className="flex flex-col text-white gap-2">
                    <div className={`absolute right-20 top-50 w-64 rounded-xl ${Glassmorph} p-6`}>
                        <div className="text-4xl font-bold text-white">25+</div>
                        <div className="mt-1 text-md text-white font-semibold">
                        Years of Experience
                        </div>
                        <p className="mt-3 text-sm text-white font-light">
                        Since 1997, delivering integrated <span className="text-white">IT</span>, <span className="text-white">ICT</span>, and <span className="text-white">IoT</span> solutions.
                        </p>
                    </div>

                    <div className={`absolute right-72 top-110 w-64 rounded-xl ${Glassmorph} p-6`}>
                        <div className="text-4xl font-bold text-white">50+</div>
                        <div className="mt-1 text-md text-white font-semibold">Big Projects</div>
                        <p className="mt-3 text-sm text-white font-light">
                        Successfully delivering large-scale projects <span className="text-white">across industries.</span>
                        </p>
                    </div>

                    <ShinyText
                        text="Trusted to Commitment"
                        speed={2}
                        delay={1}
                        color="#b5b5b5"
                        shineColor="white"
                        spread={120}
                        direction="left"
                        yoyo={false}
                        pauseOnHover={false}  
                        disabled={false}
                        className="text-3xl font-bold" 
                    />
                    <BlurText
                        text="PT Tidex Titan Persada"    
                        delay={200}
                        animateBy="words"
                        direction="top"
                        className="text-8xl font-bold max-w-3xl"
                        animationFrom={undefined} 
                        animationTo={undefined} 
                        onAnimationComplete={undefined}/>
                    <p className="max-w-2xl text-white">We believe the values of commitment, willingness to learn and develop and make customer-centric, are the values and culture we build in teams that will bring the company to <span className="text-white">grow</span>, <span className="text-white">strong</span> and <span className="text-white">healthy</span>.</p>
                    <div className="flex gap-3 mt-3">
                        <button className="bg-white text-black py-2 px-4 rounded-lg cursor-pointer">Our product</button>
                        <button
                            className={`text-white py-2 px-4 rounded-lg cursor-pointer flex gap-1 items-center group ${Glassmorph}`}
                        >
                        Lets Talk
                        <ArrowRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                        </button>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default Hero;