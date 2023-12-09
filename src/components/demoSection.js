import LogoIcon from "../components/assets/logoIcon";

export default function DemoSection() {

    return (
        <section className="flex mt-6 justify-center items-center gap-12">

            <div className="bg-gray-800 w-[340px] h-[580px] rounded-xl shadow-md shadow-cyan-500"></div>

            <LogoIcon/>

            <div className="bg-gray-800 w-[340px] h-[580px] rounded-xl shadow-md shadow-cyan-500"></div>

        </section>
    );
}