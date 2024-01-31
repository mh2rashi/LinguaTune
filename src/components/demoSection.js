import LogoIcon from "../components/assets/logoIcon";


export default function DemoSection() {

    return (
        <>

<section className="mt-6 justify-center items-center flex flex-col gap-6 sm:flex sm:flex-row sm:gap-12">
  <div className="bg-gray-800 w-[340px] h-[580px] rounded-xl shadow-md shadow-cyan-500 relative overflow-hidden">
    <video src="/videos/originalVideo.mp4" preload muted autoPlay loop controls className="w-full h-full object-cover"></video>
  </div>
  <div className="hidden sm:block">
    <LogoIcon/>
  </div>
  <div className="bg-gray-800 w-[340px] h-[580px] rounded-xl shadow-md shadow-cyan-500 relative overflow-hidden">
    <video src="/videos/subtitledVideo.mp4" preload muted autoPlay loop controls className="w-full h-full object-cover"></video>
  </div>
</section>



        </>
    );
}