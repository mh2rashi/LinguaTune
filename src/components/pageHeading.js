/**
 * The PageHeading function returns a section containing a page heading and a description for our application.
 * @returns a JSX element that represents a section containing the page heading and description.
**/

export default function PageHeading() {
    return (
        // Section containing the page heading and description
        <section className="flex flex-col gap-6 lg:gap-10 text-center mt-10">
            {/* Main heading */}
            <h1 className="text-center text-5xl md:text-6xl font-semibold mb-1 text-white/90">
                {/* Text with emphasis */}
                <span className="text-blue-300">Harmonize</span> speech barriers using Lingua
                {/* Text with emphasis */}
                <span className="text-blue-300">Tune</span> and unlock your communication <span className="text-blue-300">potential</span>.
            </h1>
            {/* Description */}
            <p className="text-white text-opacity-80 px-5 md:px-10 text-2xl">
                {/* Description text with emphasis */}
                Take your videos to the next level with our state-of-the-art AI platform designed to <span className="text-blue-300">transcribe</span> videos
                with near-human accuracy. Add {/* Text with emphasis */}<span className="text-blue-300">captions</span> or <span className="text-blue-300">voice-over</span> in any language of your choice effortlessly.
            </p>
        </section>
    );
}
