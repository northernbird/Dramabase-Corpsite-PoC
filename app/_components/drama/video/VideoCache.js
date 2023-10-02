'use client'

import VideoUtils from "@/app/_utils/VideoUtils";
import dramaMockData from "@/app/_mock/DramaMockData";

/*
 * Video cache component to preload videos for future user video selection
 * TODO: Just defining hidden video tags won't work with some browsers (e.g. Safari)
 * TODO: Check how to cache videos correctly for every browser (e.g. using blob etc..)
 */
export default function VideoCache({currentSelection}) {
    const getMovieFileNames = (selection) =>
        (selection.ref) ? dramaMockData[selection.ref].movieFileNames : selection.movieFileNames

    return (
        <div className="absolute h-full w-full hidden">
            {
                currentSelection.map((selection) => {
                    return (
                        <video muted preload={"auto"} key={selection.storyId}>
                            {
                                getMovieFileNames(selection).map((movieFileName, index) => {
                                    return (
                                        <source key={index} src={VideoUtils.getVideoSrcUrl(movieFileName)} type={VideoUtils.getFileTypeByPrefix(movieFileName)}/>
                                    );
                                })
                            }
                        </video>
                    );
                })
            }
        </div>
    )
}
