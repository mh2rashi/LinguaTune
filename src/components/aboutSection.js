import DownloadIcon from "../components/assets/downloadIcon";
import UploadIcon from "../components/assets/uploadIcon";


export default function AboutSection() {

    return (
        
        <>
        <section id="about" className="flex flex-col gap-6 lg:gap-10 text-center mt-10">

                <h1 className="text-center text-5xl md:text-6xl font-semibold mb-1 text-white/90">
                    Lingua<span className="text-blue-300">Tune</span> works in <span className="text-blue-300">3</span>  simple steps.
                </h1>

                <p className="text-white text-opacity-80 px-10 text-2xl">
                    Rest assured that all your information is <span className="text-blue-300">private</span> and <span className="text-blue-300">secure</span>. 
                    Our state-of-the-art AI platform is continuously improving the quality of <span className="text-blue-300">transcriptions</span> for your uploads and recordings while maintaining security.
                </p>

            </section>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full mx-auto mt-6 mb-10">

                {/*Container 1*/}
                <div className="flex relative flex-col gap-2 p-6 relative rounded-lg flex-1 bg-black min-w-[180px] min-h-[240px] overflow-hidden shadow-lg shadow-cyan-500 justify-between border border-solid border-white border-3">
                    <div className="sm:flex flex-col gap-4">

                        <div className="flex items-center justify-between gap-2">
                            <h3 className="text-4xl sm:text-4xl md:text-5xl font-semibold">01</h3>
                           
                            <div className="flex gap-2 justify-center items-center">
                                <UploadIcon className="w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12" />

                                <svg xmlns="http://www.w3.org/2000/svg" height="36" width="36" viewBox="0 0 512 512">
                                    <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 224a128 128 0 1 0 0-256 128 128 0 1 0 0 256zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                                </svg>
                            </div>
                          
                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold mt-2">Upload or Record</h3>
                    </div>
                  
                    <p className="sm:text-left text-md sm:text-lg md:text-xl py-4">Choose your file of choice to be transcribed by our platform.</p>
                </div>

                {/*Container 2*/}
                <div className="flex relative flex-col gap-2 p-6 relative rounded-lg flex-1 bg-black min-w-[180px] min-h-[240px] overflow-hidden shadow-lg shadow-cyan-500 justify-between border border-solid border-white border-3">
                    <div className="sm:flex flex-col gap-4">

                        <div className="flex items-center justify-between gap-2">

                            <h3 className="text-4xl sm:text-4xl md:text-5xl font-semibold">02</h3>
                           
                            <div className="flex gap-2 justify-center items-center">

                                <svg xmlns="http://www.w3.org/2000/svg" height="44" width="44" viewBox="0 0 640 512">
                                    <path d="M0 128C0 92.7 28.7 64 64 64H256h48 16H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H320 304 256 64c-35.3 0-64-28.7-64-64V128zm320 0V384H576V128H320zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276H141l19-42.8zM448 164c11 0 20 9 20 20v4h44 16c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45H448 376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" height="36" width="36" viewBox="0 0 512 512">
                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                                </svg>

                            </div>
                          
                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold mt-2">Select & Edit</h3>
                    </div>
                  
                    <p className="sm:text-left text-md sm:text-lg md:text-xl py-4">Select a language for transcription and edit for complete accuracy.</p>
                </div>

                {/*Container 3*/}
                <div className="flex relative flex-col gap-2 p-6 relative rounded-lg flex-1 bg-black min-w-[180px] min-h-[240px] overflow-hidden shadow-lg shadow-cyan-500 justify-between border border-solid border-white border-3">
                    <div className="sm:flex flex-col gap-4">

                        <div className="flex items-center justify-between gap-2">

                            <h3 className="text-4xl sm:text-4xl md:text-5xl font-semibold">03</h3>
                           
                            <div className="text-xl sm:text-2xl md:text-3xl">
                                <div className="flex gap-2">
                                    <DownloadIcon className="w-18 h-18 sm:w-18 sm:h-18 md:w-18 md:h-18" />
                                </div>
                            </div>
                          
                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold mt-2">Download</h3>
                    </div>
                  
                    <p className="sm:text-left text-md sm:text-lg md:text-xl py-4">Download your upgraded video with captions or a voice-over.</p>
                </div>


            </div>
        
        
        </>
    );


}