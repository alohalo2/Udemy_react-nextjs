'use client';

import { notFound } from "next/navigation";

import { DUMMY_NEWS } from "@/dummy-news";
import { use, useReducer } from "react";

export default function InterceptedImagePage({ params }) {
    const router = useReducer();

    const newItemSlug = use(params).slug;
    const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newItemSlug);

    if (!newsItem) {
        notFound();
    }

    return (
        <>
            <div className="modal-backdrop" onClick={router.back}/>
            <dialog className="modal" open>
                <div className="fullscreen-image">
                    <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
                </div>
            </dialog>
        </>
    );
}
