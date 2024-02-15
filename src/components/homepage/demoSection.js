/**
 * The DemoSection component renders a section with two videos and a logo.
 * @returns The function `DemoSection` is returning a JSX element. It is a section containing two
 * videos. The first video shows the original video with no effects. The second shows the upgraded video
 * with effects such as subtiltes and voice-overs in different lanaguages.
 */

// Import Icon
import {LogoIcon} from "../../assets/icons";

export default function DemoSection() {
    return (
        <>
            {/* Section containing two videos */}
            <section className="mt-6 justify-center items-center flex flex-col gap-6 sm:flex sm:flex-row sm:gap-12">
                {/* First video container */}
                <div className="bg-gray-800 w-[340px] h-[580px] rounded-xl shadow-md shadow-cyan-500 relative overflow-hidden">
                    {/* First video element */}
                    <video src="/videos/originalVideo.mp4" preload muted autoPlay loop controls className="w-full h-full object-cover"></video>
                </div>
                {/* Logo container */}
                <div className="">
                    {/* LogoIcon component */}
                    <LogoIcon/>
                </div>
                {/* Second video container */}
                <div className="bg-gray-800 w-[340px] h-[580px] rounded-xl shadow-md shadow-cyan-500 relative overflow-hidden">
                    {/* Second video element */}
                    <video src="/videos/subtitledVideo.mp4" preload muted autoPlay loop controls className="w-full h-full object-cover"></video>
                </div>
            </section>
        </>
    );
}
