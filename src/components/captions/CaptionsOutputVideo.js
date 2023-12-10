
const CaptionsOutputVideo = ({ videoSource }) => {

    return (

        <div className="bg-gray-800 w-[340px] h-[580px] rounded-xl shadow-md shadow-cyan-500 flex-1 overflow-hidden">

            <video className="w-full h-full object-cover p-1 rounded-xl"
                controls
                src={videoSource}>
            </video>

        </div>

    );

};

export default CaptionsOutputVideo