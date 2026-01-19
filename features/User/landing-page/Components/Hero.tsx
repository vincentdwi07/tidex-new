import FloatingLines from "@/components/FloatingLines";
import BlurText from "@/components/BlurText"
import ShinyText from "@/components/ShinyText"
import { Glassmorph } from "@/lib/constant/Glassmorph";

const Hero = () => {
    return (
        <main className="bg-black h-screen">
            <FloatingLines 
                enabledWaves={["top", "middle", "bottom"]}
                lineCount={[10]}
                lineDistance={[10]}
                bendRadius={10}
                bendStrength={-0.5}
                interactive={true}
                parallax={true} 
                linesGradient={undefined}
                topWavePosition={undefined}
                middleWavePosition={undefined}
                animationSpeed={2}
            />
            <div className="max-w-[1400px] m-auto flex justify-start items-end h-full py-10 px-10 xl:px-0">
                <div className="flex flex-col text-white gap-2">
                    <BlurText
                        text="PT Tidex Titan Persada"
                        delay={200}
                        animateBy="words"
                        direction="top"
                        className="text-3xl font-semibold"
                        animationFrom={undefined} 
                        animationTo={undefined} 
                        onAnimationComplete={undefined}/>
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
                        className="text-8xl font-bold max-w-2xl" 
                    />
                    <p className="max-w-2xl text-gray-400">We believe the values of commitment, willingness to learn and develop and make customer-centric, are the values and culture we build in teams that will bring the company to <span className="text-white">grow</span>, <span className="text-white">strong</span> and <span className="text-white">healthy</span>.</p>
                    <div className="flex gap-3 mt-3">
                        <button className="bg-white text-black py-2 px-4 rounded-lg">Our product</button>
                        <button className={`text-white py-2 px-4 rounded-lg ${Glassmorph}`}>Lets Talk</button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Hero;