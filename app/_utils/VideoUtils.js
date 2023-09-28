'use client'

import {CanPlayType, SupportedMediaType} from "@/app/_utils/Constants";

class VideoUtils {

    static getFileExtension = (url) => url.split('.').pop();

    static getFileTypeByPrefix = (url) => {
        const extension = VideoUtils.getFileExtension(url);
        // Currently "HEVC (*.mov)" & "VP9 (*.webm)" are used
        switch (extension) {
            case 'mov':
                return SupportedMediaType.HEVC;
            case 'webm':
                return SupportedMediaType.WEBM
        }

        throw new Error("No playable media was found!");
    }

    static getVideoFileByType = (type, videoFiles) => {
        const filteredVideo = videoFiles.filter((file) => VideoUtils.getFileTypeByPrefix(file) === type);
        return VideoUtils.getVideoSrcUrl(filteredVideo);
    }

    static getSupportedVideoFileType = (videoRef) => {

        const canPlayWebm = videoRef.current.canPlayType(SupportedMediaType.WEBM) === CanPlayType.PROBABLY;
        const canPlayHevc = videoRef.current.canPlayType(SupportedMediaType.HEVC) === CanPlayType.PROBABLY;

        /*
         * For Safari (only for PC), it returns "probably playable" both for HEVC & WebM.
         * In that case, Safari should use HEVC video file as a preferred use.
         * (Webm file won't work as a transparent movie)
         * Therefore, if both have been detected as "playable", use HEVC.
         */
        if (canPlayWebm && canPlayHevc) {
            return SupportedMediaType.HEVC;
        } else {
        if (canPlayWebm) {
            return SupportedMediaType.WEBM;
        } else if (canPlayHevc) {
            return SupportedMediaType.HEVC;

            }
        }

        throw new Error("No playable media was found!");

    }


    static getVideoSrcUrl = (fileName) => process.env.NEXT_PUBLIC_VIDEO_FILE_URL_BASE + fileName;

    static getBackgroundUrl = (fileName) => process.env.NEXT_PUBLIC_VIDEO_BACKGROUND_URL_BASE + fileName;

    static getImageUrl = (fileName) => process.env.NEXT_PUBLIC_VIDEO_IMAGE_URL_BASE + fileName;

}

export default VideoUtils;