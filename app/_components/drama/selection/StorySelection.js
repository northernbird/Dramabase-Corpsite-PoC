'use client'
import VideoUtils from "@/app/_utils/VideoUtils";
import Image from "next/image";

/*
 * TODO: Consider to use grid design to easily generate selections equally by code
 */
export default function StorySelection({onClick, image, alt}) {
    return (
        <div className="w-full h-auto flex flex-row-reverse">
            <div onClick={onClick} className={"p-2 h-auto"}  style={{width: "43%"}}>
                <Image className={"cursor-pointer w-full h-full"}  src={VideoUtils.getImageUrl(image)} alt={alt} width={200} height={300} />
            </div>
        </div>
    )
}