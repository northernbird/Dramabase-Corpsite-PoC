'use client'

import Image from 'next/image'
import React from 'react'
import SendButton from '../../_assets/button/send.png'
import {useForm} from "react-hook-form";

/*
 * TODO: Consider to resolve code duplication with RequestForm
 */
export default function InquiryForm({errorMessage, submittedMessage, onSubmitHandler}) {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    return (
        <div className="px-3 py-4">
            <h3 className="mb-px text-base md:text-xl text-white text-center">問い合わせ</h3>
            {submittedMessage()}
            <form className="space-y-4" onSubmit={handleSubmit((data, e) => {
                onSubmitHandler(data, e, "inquiry")
            })}
                  method="POST">

                <div>
                    <label
                        htmlFor="company_name"
                        className="block mb-1 text-xs text-white tracking-widest"
                    >
                        企業名
                    </label>
                    <input
                        type="text"
                        name="company_name"
                        id="company_name"
                        className="bg-gray-300 border border-gray-400 text-black text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        placeholder=""
                        // required
                        {...register("company_name", {required: true})}
                    />
                    {errors.company_name && errorMessage}
                </div>
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-1 text-xs text-white tracking-widest"
                    >
                        氏名
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder=""
                        className="bg-gray-300 border border-gray-400 text-black text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        // required
                        {...register("name", {required: true})}
                    />
                    {errors.name && errorMessage}
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-1 text-xs text-white tracking-widest"
                    >
                        Mail
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder=""
                        className="bg-gray-300 border border-gray-400 text-black text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        // required
                        {...register("email", {required: true})}
                    />
                    {errors.email && errorMessage}
                </div>
                <div>
                    <label
                        htmlFor="inquiry"
                        className="block mb-1 text-xs text-white tracking-widest"
                    >
                        問い合わせ内容
                    </label>
                    <textarea
                        name="inquiry"
                        placeholder=""
                        className="bg-gray-300 border border-gray-400 text-black text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                        // required
                        {...register("inquiry", {required: true})}
                    />
                    {errors.inquiry && errorMessage}
                </div>
                <button
                    type="submit"
                    className="w-full cursor-pointer hover:opacity-80 px-2 pt-1 pb-5"
                >
                    <Image src={SendButton} alt="送信ボタン" className="object-contain"/>
                </button>
            </form>
        </div>
    )

}