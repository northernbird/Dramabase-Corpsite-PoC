'use client'

import {forwardRef} from "react";

export default forwardRef(function Video({onEnded, handleProgress, muted}, ref) {
    const timeUpdate = (event) => {
        if (event.target.currentTime > 0) {
            handleProgress(event.target.currentTime);
        }
    }

    return (
        <div className="absolute h-full w-full">
            <video ref={ref}
                   playsInline={true}
                   onEnded={onEnded}
                   className={"h-full w-full"}
                   preload={"auto"}
                   muted={muted}
                   onTimeUpdate={(event) => {
                       timeUpdate(event);
                   } }
            />
        </div>
    );
});