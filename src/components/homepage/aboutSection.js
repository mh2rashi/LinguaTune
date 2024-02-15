/**
 * The `AboutSection` function renders a section that explains the three steps involved in using the
 * LinguaTune platform. The `Step` function renders a single step within the AboutSection.
 * It displays the step number, title, description, and associated icons.
 * @returns The AboutSection component is being returned.
**/

// Import icons
import {
RecordIcon2,
UploadIcon,
LanguageIcon,
EditIcon,
DownloadIcon2
} from "../../assets/icons"


export default function AboutSection() {

    const Step = ({ number, title, description, icons, heights, widths }) => {
        return (
          <div className="flex relative flex-col gap-2 p-6 relative rounded-lg flex-1 bg-black min-w-[180px] min-h-[240px] overflow-hidden shadow-lg shadow-cyan-500 justify-between border border-solid border-white border-3 text-white">
            <div className="sm:flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                {/* Display step number */}
                <h3 className="text-4xl sm:text-4xl md:text-5xl font-semibold">{number}</h3>
                <div className="flex gap-2 justify-center items-center">
                  {/* Display icons for the step */}
                  {icons.map((Icon, index) => (
                    <Icon key={index} height={heights[index]} width={widths[index]} />
                  ))}
                </div>
              </div>
              {/* Display step title */}
              <h3 className="text-2xl md:text-3xl font-semibold mt-2">{title}</h3>
            </div>
            {/* Display step description */}
            <p className="sm:text-left text-md sm:text-lg md:text-xl py-4">{description}</p>
          </div>
        );
      };

    return ( 
        <>
            <section id="about" className="flex flex-col gap-6 lg:gap-10 text-center mt-10">
                {/* Heading */}
                <h1 className="text-center text-5xl md:text-6xl font-semibold mb-1 text-white/90">
                    Lingua<span className="text-blue-300">Tune</span> works in <span className="text-blue-300">3</span>  simple steps.
                </h1>

                {/* Description */}
                <p className="text-white text-opacity-80 px-10 text-2xl">
                    Rest assured that all your information is <span className="text-blue-300">private</span> and <span className="text-blue-300">secure</span>. 
                    Our state-of-the-art AI platform is continuously improving the quality of <span className="text-blue-300">transcriptions</span> for your uploads and recordings while maintaining security.
                </p>
            </section>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full mx-auto mt-6 mb-10">
                <Step
                    number="01"
                    title="Upload or Record"
                    description="Choose your file of choice to be transcribed by our platform."
                    icons={[UploadIcon, RecordIcon2]}
                    heights={[46, 36]}
                    widths={[46, 36]}
                />
                <Step
                    number="02"
                    title="Select & Edit"
                    description="Select a language for transcription and edit for complete accuracy."
                    icons={[LanguageIcon, EditIcon]}
                    heights={[46, 36]}
                    widths={[46, 36]}
                />
                <Step
                    number="03"
                    title="Download"
                    description="Download your upgraded video with captions or a voice-over."
                    icons={[DownloadIcon2]}
                    heights={[36]} // Corrected prop name
                    widths={[36]} // Corrected prop name
                />
            </div>
        </>
    );
}
