import FloatingLines from "@/components/FloatingLines";
import BlurText from "@/components/BlurText"
import ShinyText from "@/components/ShinyText"
import { Glassmorph } from "@/lib/constant/Glassmorph";
import { ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <main className="bg-white h-screen relative">
            <div className="absolute bottom-0 left-0 right-0 w-full bg-gradient-to-t from-white to-transparent h-[30%] z-2"></div>
            <FloatingLines 
                enabledWaves={["top", "middle", "bottom"]}
                lineCount={[10]}
                lineDistance={[10]}
                bendRadius={10}
                bendStrength={-0.5}
                interactive={false}
                parallax={false} 
                linesGradient={["#ff3b30", "#af52de", "#007aff"]}
                topWavePosition={undefined}
                middleWavePosition={undefined}
                animationSpeed={2}
            />
            <div className="max-w-[1400px] m-auto flex justify-start items-end h-full py-10 px-10 xl:px-0 relative z-3">
                <div className="flex flex-col text-neutral-950 gap-2">
                    <div className={`absolute right-20 top-50 w-64 rounded-xl ${Glassmorph} p-6 border border-neutral-200/60`}>
                        <div className="text-4xl font-bold text-neutral-900">25+</div>
                        <div className="mt-1 text-md text-neutral-800 font-semibold">
                        Years of Experience
                        </div>
                        <p className="mt-3 text-sm text-neutral-500 font-light">
                        Since 1997, delivering integrated <span className="text-neutral-800 font-medium">IT</span>, <span className="text-neutral-800 font-medium">ICT</span>, and <span className="text-neutral-800 font-medium">IoT</span> solutions.
                        </p>
                    </div>

                    <div className={`absolute right-72 top-110 w-64 rounded-xl ${Glassmorph} p-6 border border-neutral-200/60`}>
                        <div className="text-4xl font-bold text-neutral-900">50+</div>
                        <div className="mt-1 text-md text-neutral-800 font-semibold">Big Projects</div>
                        <p className="mt-3 text-sm text-neutral-500 font-light">
                        Successfully delivering large-scale projects <span className="text-neutral-800 font-medium">across industries.</span>
                        </p>
                    </div>

                    <ShinyText
                        text="Trusted to Commitment"
                        speed={2}
                        delay={1}
                        color="#525252"
                        shineColor="#000000"
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
                        className="text-8xl font-bold max-w-3xl text-neutral-950"
                        animationFrom={undefined} 
                        animationTo={undefined} 
                        onAnimationComplete={undefined}/>
                    <p className="max-w-2xl text-neutral-600">We believe the values of commitment, willingness to learn and develop and make customer-centric, are the values and culture we build in teams that will bring the company to <span className="text-neutral-900 font-semibold">grow</span>, <span className="text-neutral-900 font-semibold">strong</span> and <span className="text-neutral-900 font-semibold">healthy</span>.</p>
                    <div className="flex gap-3 mt-3">
                        <button className="bg-neutral-950 text-white hover:bg-neutral-850 transition-colors py-2 px-4 rounded-lg cursor-pointer">Our product</button>
                        <button
                            className="text-neutral-800 py-2 px-4 rounded-lg cursor-pointer flex gap-1 items-center group border border-neutral-200/80 bg-neutral-50/50 hover:bg-neutral-100/50 transition-all duration-300"
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