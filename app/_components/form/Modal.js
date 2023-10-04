'use client'

import React, {cloneElement, useEffect, useState} from "react";

export default function Modal({modalId, showModal, children}) {

    const [submitted, setSubmitted] = useState(false);
    const errorMessage = <p className="block mb-1 text-xs text-red-400 tracking-widest">入力必須です</p>;
    const onSubmitHandler = async (request, e, type) => {
        const res = await fetch(`/api/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({request}),
        })

        const json = await res.json();

        console.log("Server Response : " + JSON.stringify(json));

        // reset after form submit
        e.target.reset();
        setSubmitted(true);
    }
    const renderChild = () => {
        return cloneElement(children, {
            showModal,
            errorMessage,
            submittedMessage,
            onSubmitHandler
        });
    };
    const submittedMessage = () => {
        return (submitted) ? <p
            className="mb-1 text-center text-sm text-red-400 tracking-widest">送信完了しました</p> : null;
    }

    useEffect(() => {
        if (showModal) {
            setSubmitted(false);
        }
    }, [showModal])

    return (
        <div style={{visibility: showModal ? 'visible' : 'hidden'}}>
            <div className={'flex'}>
                <div
                    id={modalId}
                    tabIndex="-1"
                    aria-hidden="true"
                    className="absolute top-3 right-0 z-20 overflow-y-auto h-full max-h-[60vh] justify-center items-center p-2 w-52"
                >
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-black/75 rounded-lg shadow">
                            {renderChild()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}