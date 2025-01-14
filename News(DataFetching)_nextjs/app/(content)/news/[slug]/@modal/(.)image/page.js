// 'use client';

// import { notFound,useRouter } from "next/navigation";

// import { DUMMY_NEWS } from "@/dummy-news";
// import { use } from "react";

// export default function InterceptedImagePage({ params }) {
//     const router = useRouter();

//     const newItemSlug = use(params).slug;
//     const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newItemSlug);

//     if (!newsItem) {
//         notFound();
//     }

//     return (
//         <>
//             <div className="modal-backdrop" onClick={router.back}/>
//             <dialog className="modal" open>
//                 <div className="fullscreen-image">
//                     <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
//                 </div>
//             </dialog>
//         </>
//     );
// }

/*-------------------------------------------------------------------------- */

import { notFound } from "next/navigation";

import ModalBackdrop from "@/components/modal-backdrop";
import { getNewsItem } from "@/lib/news";

export default async function InterceptedImagePage({ params }) {

    const newsItemSlug = (await params).slug;
    const newsItem = await getNewsItem(newsItemSlug);

    if (!newsItem) {
        notFound();
    }

    return (
        <>
            <ModalBackdrop />
            <dialog className="modal" open>
                <div className="fullscreen-image">
                    <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
                </div>
            </dialog>
        </>
    );
}