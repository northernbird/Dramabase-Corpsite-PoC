const MockDramaData = {
    // Main Story
    main : {
        storyId: "e4b03e14-fee6-4f52-9bb7-7006b5a25e1d",
        parentStoryId : null,
        movieFileNames : [
            "main_start.mov",
            "main_start_VP9.webm"
        ],
        backgroundFileName : "background.jpeg",
        userInteractionTimeInSec: 10,
        selection : [
            //SERVICE
            {
                storyId: "729a66a6-d93b-4083-8041-5672187cfac9",
                parentStoryId : "e4b03e14-fee6-4f52-9bb7-7006b5a25e1d",
                image: "bt_com2_service.png",
                ref: "service"
            },
            {
                storyId: "101a86d0-de95-48ef-8086-8509c1e374a1",
                parentStoryId : "e4b03e14-fee6-4f52-9bb7-7006b5a25e1d",
                image: "bt_com2_company.png",
                ref: "company"
            }
        ]
    },
    // 問合せ
    inquiry : {
        storyId: "b5eddcc4-15d5-4a43-9445-cc979b89d988",
        parentStoryId: null,
        movieFileNames: [
            "inquiry_start.mov",
            "inquiry_start_VP9.webm"
        ],
        backgroundFileName: "background.jpeg",
        userInteractionTimeInSec: 2.5,
        selection: null,
        custom: true
    },
    // 資料請求
    request : {
        storyId: "3cd16be6-c4da-4d0d-9348-566da3ac1c53",
        parentStoryId: null,
        movieFileNames: [
            "request_start.mov",
            "request_start_VP9.webm"
        ],
        backgroundFileName: "background.jpeg",
        //custom user interaction
        userInteractionTimeInSec: 4,
        selection: null,
        custom: true
    },
    // サービス
    service: {
        storyId: "a8a01098-c9d1-41d7-9f4e-9d9aa6c8f613",
        parentStoryId: null,
        movieFileNames: [
            "main_service.mov",
            "main_service_VP9.webm"
        ],
        backgroundFileName: "background.jpeg",
        userInteractionTimeInSec: 1,
        selection: [
            // インタラクティブドラマ事業
            {
                storyId: "dc7a5c59-ca01-478c-8b28-98aa88f44609",
                parentStoryId: "a8a01098-c9d1-41d7-9f4e-9d9aa6c8f613",
                movieFileNames : [
                    "service_drama.mov",
                    "service_drama_VP9.webm"
                ],
                backgroundFileName : "background.jpeg",
                image: "bt_com2_develop.png",
                userInteractionTimeInSec: null,
                selection: null
            },
            // アプリ・ゲーム事業
            {
                storyId: "b82b97a8-8508-4b57-927b-e6ffcc7497bf",
                parentStoryId: "a8a01098-c9d1-41d7-9f4e-9d9aa6c8f613",
                movieFileNames : [
                    "service_develop.mov",
                    "service_develop_VP9.webm"
                ],
                backgroundFileName : "background.jpeg",
                image: "bt_com2_drama.png",
                userInteractionTimeInSec: null,
                selection: null
            },
            // e-sports事業
            {
                storyId: "fe072409-e48f-47c3-add2-68a44e4b781c",
                parentStoryId: "a8a01098-c9d1-41d7-9f4e-9d9aa6c8f613",
                movieFileNames : [
                    "service_esports.mov",
                    "service_esports_VP9.webm"
                ],
                backgroundFileName : "background.jpeg",
                image: "bt_com2_esports.png",
                userInteractionTimeInSec: null,
                selection: null
            }
        ],
    },
    // Company
    company : {
        storyId: "117dc7ae-293f-4592-8b5d-305552354d35",
        parentStoryId: null,
        movieFileNames: [
            "main_company.mov",
            "main_company_VP9.webm"
        ],
        backgroundFileName: "background.jpeg",
        userInteractionTimeInSec: null,
        selection: null,
    },
}


export default MockDramaData;