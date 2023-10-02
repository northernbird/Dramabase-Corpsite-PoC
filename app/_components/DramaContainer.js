'use client'

import 'flowbite'
import {useEffect, useRef, useState} from 'react';
import VideoContainer from "@/app/_components/drama/VideoContainer";
import VideoPlayController from "@/app/_components/drama/control/VideoPlayController";
import ControlMenu from "@/app/_components/drama/control/ControlMenu";
import dramaMockData from "@/app/_mock/DramaMockData";
import Modal from "@/app/_components/form/Modal";
import Header from "@/app/_components/drama/control/Header";
import VideoUtils from "@/app/_utils/VideoUtils";
import RequestForm from "@/app/_components/form/RequestForm";
import InquiryForm from "@/app/_components/form/InquiryForm";

export default function DramaContainer() {

    /*
     * State
     */
    const [currentStory, setCurrentStory] = useState(dramaMockData.main);
    const [prevStories, setPrevStories] = useState([]);
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(true);
    const [playedTime, setPlayedTime] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [videoEnd, setVideEnd] = useState(false);
    /*
     * TODO: isVideoReady isn't currently used but later it should be used again
     */
    // const [isVideoReady, setIsVideoReady] = useState(false);

    /*
     * Custom - ModalForm settings
     */
    const REQUEST_FORM_MODAL_ID = "request-modal"
    const INQUIRY_FORM_MODAL_ID = "inquiry-modal"
    const DOCUMENT_REQUEST_STORY_ID = "3cd16be6-c4da-4d0d-9348-566da3ac1c53";
    const INQUIRY_FORM_STORY_ID = "b5eddcc4-15d5-4a43-9445-cc979b89d988";
    const SERVICE_DRAMA_STORY_ID = "dc7a5c59-ca01-478c-8b28-98aa88f44609";
    const [showDocumentRequestModal, setShowDocumentRequestModal] = useState(false);
    const [showInquiryFormModal, setShowInquiryFormModal] = useState(false);
    /*
     * Refs
     */
    const selectionRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const startVideo = async () => {
            try {
                /*
                 * update state to show the loading oval
                 * TODO: isVideoReady isn't currently used but later it should be used again
                 */
               // setIsVideoReady(false);

                /*
                 * Video.play returns a promise object
                 * https://developer.chrome.com/blog/play-request-was-interrupted/
                 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
                 */
                /*
                 * NOTE : iPhone/Safari doesn't work with autoplay even if sound is muted.
                 * https://developer.apple.com/forums/thread/709821
                 * https://discourse.webflow.com/t/autoplay-video-not-playing-on-low-power-mode/215057
                 */
               await videoRef.current.play();

                /*
                 * update state to close the loading oval
                 * TODO: isVideoReady isn't currently used but later it should be used again
                 */
                // setIsVideoReady(true);
            } catch (e) {
                console.error("Failed to start video: " + e)
            }
        };

        // TODO: Refactor not to be called "getSupportedVideoFileType" for every story state change
        // (Supported video type should be always same for every render)
        const videoType = VideoUtils.getSupportedVideoFileType(videoRef);
        videoRef.current.src = VideoUtils.getVideoFileByType(videoType, currentStory.movieFileNames);
        /*
         * As here video src has been programmatically changed, the "load" method is needed to reset media status
         * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/load
         */
        videoRef.current.load();
        void startVideo().catch(console.error);

    },[currentStory]);

    /*
     * Callbacks
     */
    const handleVideoEnd = () => {
        setPlaying(false);
        setVideEnd(true);
    };

    const handleSelectOnClick = (selected) => {

        /*
         * Get next selection info
         */
        const selectedStory = currentStory.selection.filter(selection => selection.storyId === selected)[0];

        /*
         * Push prevStories
         */
        prevStories.push(currentStory);
        setPrevStories(prevStories);
        /*
         * Update story infos
         */
        let nextStory;
        if (selectedStory.ref) {
            nextStory = dramaMockData[selectedStory.ref];
        } else {
            nextStory = selectedStory;
        }
        setCurrentStory(nextStory);
        /*
         * Reset video status
         */
        resetVideoStatus();
        /*
         * Reset user interaction
         */
        resetUserInteraction();
    };

    const handlePlayButtonClick = () =>{
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {

            // If video ends already, initialize video play time
            // As a result, video will re-start from the beginning
            if (videoEnd) {
                videoRef.current.currentTime = 0;
                setPlayedTime(0);
                //Reset user interaction here
                //e.g. if user restarts inquiry or document request, forms should be closed by restart
                resetUserInteraction();
            }
            videoRef.current.play();
            setPlaying(true);
        }
    }

    const handleMuteButtonClick = () =>{
        if (muted) {
            videoRef.current.muted = false;
            setMuted(false);
        } else {
            videoRef.current.muted = true;
            setMuted(true);
        }
    }

    const handleSeekStart = () => {
        setSeeking(true);
    }

    const handleSeekChange = newTime => {
        setPlayedTime(newTime);
    }

    const handleSeekEnd = (currentTime) => {
        setVideEnd(false);
        setPlayedTime(currentTime);
        setSeeking(false);
        videoRef.current.currentTime = videoRef.current.duration * (currentTime/100);
        // Reset user interaction as current playback time has been changed
        resetUserInteraction();
    }

    const handleProgress = (currentTime) => {
        if (!seeking) {

            if (currentTime > currentStory.userInteractionTimeInSec) {
                onMovieInteraction();
            }

            const updatedTime = (currentTime/videoRef.current.duration) * 100;
            // For iOS Safari, sometimes browser native API can't return correct playback time (returns reversed time).
            // Therefore, check the given time is forward to the current playing time
            if (updatedTime>playedTime) {
                setPlayedTime(updatedTime);
            }

        }
    }

    const onUpdateStory = (story) => {
        /*
         * Initialize previous story stack
         */
        setPrevStories([]);
        /*
         * Updated video status
         */
        resetVideoStatus();
        /*
         * Reset user interaction
         */
        resetUserInteraction();

        /*
         * Update stories
         */
        setCurrentStory(dramaMockData[story]);
    }

    const onBackPrevious = () => {
        if (prevStories.length <= 0) return;

        /*
         * Updated isLoaded status
         */
        resetVideoStatus();
        /*
         * Reset user interaction
         */
        resetUserInteraction();

        const prevStory  = prevStories.pop();
        setPrevStories(prevStories);
        setCurrentStory(prevStory);
    }
    
    const onMovieInteraction = () => {
        if (currentStory.custom) {
            // 資料請求
            if (currentStory.storyId === DOCUMENT_REQUEST_STORY_ID){
                setShowDocumentRequestModal(true);
            }
            // 問い合わせ
            if (currentStory.storyId === INQUIRY_FORM_STORY_ID){
                setShowInquiryFormModal(true);
            }
            // サービス=>インタラクティブドラマ事業
            if (currentStory.storyId === SERVICE_DRAMA_STORY_ID){
                window.location.href = "https://www.dramabase.tokyo/";
            }
      } else {
          if (currentStory.selection) selectionRef.current.style.visibility = "visible";
      }
    }

    const resetUserInteraction = () => {
        const closeAllModalForms = () => {
            setShowDocumentRequestModal(false);
            setShowInquiryFormModal(false);
        }
        // Hide story selection div
        if (currentStory.selection) selectionRef.current.style.visibility = "hidden";
        closeAllModalForms();
    }

    const resetVideoStatus = () => {
        videoRef.current.currentTime = 0;
        setPlayedTime(0);
        setVideEnd(false);
        setPlaying(true);
    }

    /**
     * Components
     */
    return (
    <>
            <Header onUpdateStory={onUpdateStory}/>
            <div className="relative flex flex-col w-full h-full bg-transparent">
                <div className="grow w-full flex flex-col">
                    {/*Movie Area*/}
                    <div className="grow w-full h-full">
                        <VideoContainer
                            currentStory={currentStory}
                            selectionRef={selectionRef}
                            videoRef={videoRef}
                            handleVideoEnd={handleVideoEnd}
                            handleSelectOnClick={handleSelectOnClick}
                            handleVideoProgress={handleProgress}
                            muted={muted}
                            //TODO: isVideoReady isn't currently used but later it should be used again
                            // isVideoReady={isVideoReady}
                        />
                    </div>
                    <div>
                        {/*Movie Slider Area*/}
                        <VideoPlayController
                            handlePlayButtonClick={handlePlayButtonClick}
                            handleMuteButtonClick={handleMuteButtonClick}
                            handleSeekChange={handleSeekChange}
                            handleSeekStart={handleSeekStart}
                            handleSeekEnd={handleSeekEnd}
                            playing={playing}
                            muted={muted}
                            playedTime={playedTime}
                        />
                    </div>
                    <div>
                        {/*Control Menu Area*/}
                        <ControlMenu
                            onUpdateStory={onUpdateStory}
                            onBackPrevious={onBackPrevious}/>
                    </div>

                </div>
                {/* RequestForm Modal*/}
                <Modal
                    modalId={REQUEST_FORM_MODAL_ID}
                    showModal={showDocumentRequestModal}
                >
                    <RequestForm show={showDocumentRequestModal} />
                </Modal>
                {/* InquiryForm Modal*/}
                <Modal
                    modalId={INQUIRY_FORM_MODAL_ID}
                    showModal={showInquiryFormModal}
                >
                    <InquiryForm show={showInquiryFormModal} />
                </Modal>
            </div>
   </>
    )
}