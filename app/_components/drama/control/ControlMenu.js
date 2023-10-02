'use client'

import 'flowbite'
import Image from "next/image";
import BgControlMenu from "@/app/_assets/backgroud/control_menu.png";
import BackButton from "@/app/_assets/button/back.png";
import HomeButton from "@/app/_assets/button/home.png";
import InquiryButton from "@/app/_assets/button/bt_csv.png";
import DocumentRequest from "@/app/_assets/button/document_request.png";


export default function ControlMenu ({ onUpdateStory, onBackPrevious}) {
    return (

        <div className="flex flex-nowrap relative space-y-1">
            <Image
                src={BgControlMenu}
                alt="コントロールエリア背景"
                className="h-full w-full absolute"
            />
            <div className="z-10 flex justify-center items-center space-x-2">
                <button type="button"
                        className="flex cursor-pointer hover:opacity-80"
                        onClick={() => onBackPrevious('back')}>
                    <Image
                        src={BackButton}
                        alt="バックボタン"
                        className="object-contain max-h-fit h-14 p-1"
                    />
                </button>

                <button type="button"
                        className="flex cursor-pointer hover:opacity-80"
                        onClick={() => onUpdateStory('main')}>
                    <Image
                        src={HomeButton}
                        alt="ホームボタン"
                        className="object-contain max-h-fit h-14 p-1"
                    />
                </button>

                <button type="button"
                        className="flex cursor-pointer hover:opacity-80"
                        onClick={() => onUpdateStory('inquiry')}>
                    <Image
                        src={InquiryButton}
                        alt="問合せボタン"
                        className="object-contain max-h-fit h-14 p-1"
                    />
                </button>

                <button
                    type="button"
                    className="flex cursor-pointer hover:opacity-80"
                    onClick={() => onUpdateStory('request')}
                >
                    <Image
                        src={DocumentRequest}
                        alt="資料請求"
                        className="object-contain max-h-fit h-14 p-1"
                    />
                </button>
            </div>
        </div>


    )
}
