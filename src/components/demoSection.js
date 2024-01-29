import LogoIcon from "../components/assets/logoIcon";


export default function DemoSection() {

    return (
        <>
        <section className="mt-6 justify-center items-center flex flex-col gap-6 sm:flex sm:flex-row sm:gap-12">

        <div className="bg-gray-800 w-[340px] h-[580px] rounded-xl shadow-md shadow-cyan-500"></div>

        <LogoIcon/>

        <div className="bg-gray-800 w-[340px] h-[580px] rounded-xl shadow-md shadow-cyan-500"></div>

        </section>



        </>
    );
}