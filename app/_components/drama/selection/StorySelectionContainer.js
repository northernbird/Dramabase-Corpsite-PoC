'use client'

import StorySelection from "@/app/_components/drama/selection/StorySelection";
import {forwardRef} from "react";

export default forwardRef(function StorySelectionContainer({selection, onClick}, ref) {
    return (
        <div className="absolute top-6 left-0 w-full h-auto flex flex-col" style={{visibility: "hidden"}} ref={ref}>
            {selection.map((data, index) => {
                return (
                    <StorySelection key = {data.storyId} image = {data.image} alt={"selection-"+index} onClick={()=>{onClick(data.storyId)}}/>
                );
            })}
        </div>
    );
});
