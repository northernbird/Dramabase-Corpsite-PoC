'use client'

import Image from "next/image";
import VideoPlayButton from "@/app/_assets/button/bt_play.png"
import VideoPauseButton from "@/app/_assets/button/bt_pause.png";
import VideoMuteButton from "@/app/_assets/button/bt_mute_off.png";
import VideoUnmuteButton from "@/app/_assets/button/bt_mute_on.png";

export default function VideoPlayController({
                                                handlePlayButtonClick,
                                                handleMuteButtonClick,
                                                handleSeekChange,
                                                handleSeekStart,
                                                handleSeekEnd,
                                                playing,
                                                muted,
                                                playedTime}) {

    return (
        <div className="flex flex-row items-center grow-0 bg-black w-full h-auto p-2">
            <Image
                src={(playing) ? VideoPauseButton.src: VideoPlayButton.src}
                alt="play logo"
                width={200}
                height={160}
                className="w-9 h-9 cursor-pointer"
                placeholder="blur"
                blurDataURL={(playing) ? VideoPauseButton.src: VideoPlayButton.src}
                onClick={()=>{handlePlayButtonClick()}}
            />
            <div
                className="flex grow justify-center flex-wrap m-px"
            >
                <input id="playtime-range"
                       type="range"
                       value={playedTime}
                       min={0}
                       max={100}
                       step='any'
                       className="w-full h-2 cursor-pointer"
                       style={{background: "white", borderRadius: "8px"}}
                       onChange={(event) => handleSeekChange(event.target.value)}
                       onMouseDown={handleSeekStart}
                       onTouchStart={handleSeekStart}
                       onMouseUp={(event) => handleSeekEnd(event.target.value)}
                       onTouchEnd={(event) => handleSeekEnd(event.target.value)}

                />
            </div>
            <Image
                src={(muted) ? VideoUnmuteButton.src: VideoMuteButton.src}
                alt="mute logo"
                width={200}
                height={160}
                className="w-10 h-10 cursor-pointer"
                blurDataURL={(muted) ? VideoUnmuteButton.src: VideoMuteButton.src}
                placeholder="blur"
                onClick={()=>{handleMuteButtonClick()}}
            />
        </div>
    )
}
