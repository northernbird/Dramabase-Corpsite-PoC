'use client'

import 'flowbite'
import StorySelectionContainer from "@/app/_components/drama/selection/StorySelectionContainer";
import Video from "@/app/_components/drama/video/Video"
import VideoCache from "@/app/_components/drama/video/VideoCache";
import VideoUtils from "@/app/_utils/VideoUtils";
import BannerCarousel from "@/app/_components/BannerCarousel";

export default function VideoContainer({
                                  currentStory,
                                  selectionRef,
                                  videoRef,
                                  handleVideoEnd,
                                  handleSelectOnClick,
                                  handleVideoProgress,
                                  muted,
                                  //TODO: isVideoReady isn't currently used but later it should be used again
                                  //isVideoReady
                                  }) {

    /**
     * Components
     */
    return (
    <div className= "flex w-full h-full bg-cover" style={{backgroundImage: "url(" + VideoUtils.getBackgroundUrl(currentStory.backgroundFileName) + ")"}}>
        <div className="relative w-full h-full">
            {/*TODO: iPhone safari shows LoadingOval for every video transition.*/}
            {/*TODO: Fix the above issue by checking how browser caching works by iphone safari */}
            {/*    !isVideoReady*/}
            {/*    &&*/}
            {/*    <LoadingOval/>*/}
            {/*}*/}
            <Video
                ref={videoRef}
                onEnded={handleVideoEnd}
                handleProgress = {handleVideoProgress}
                muted={muted} />
            {/*Preload selection movies with hidden*/}
            {/*TODO: Just defining hidden video tags won't work with some browsers (e.g. Safari) */}
            {/*TODO: Check how to cache videos correctly for every browser (e.g. using blob etc..) */}
            {
                currentStory.selection
                &&
                <>
                    <VideoCache currentSelection={currentStory.selection}/>
                    <StorySelectionContainer selection={currentStory.selection} ref={selectionRef}
                                             onClick={handleSelectOnClick}/>
                </>

            }
            {/*Embed banner div inside the video play view*/}
            {/*TODO: Check how to isolate banner component from drama&video related components.*/}
            <div className="absolute w-full bottom-0">
                <BannerCarousel/>
            </div>
        </div>
    </div>
    )
}