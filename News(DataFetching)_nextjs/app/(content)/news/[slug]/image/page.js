// import { notFound } from "next/navigation";

// import { DUMMY_NEWS } from "@/dummy-news";

// export default async function ImagePage({ params }) {
//     const newItemSlug = (await params).slug;
//     const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newItemSlug);

//     if (!newsItem) {
//         notFound();
//     }

//     return (
//         <div className="fullscreen-image">
//             <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
//         </div>
//     );
// }

import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

export default async function ImagePage({ params }) {
    const newItemSlug = (await params).slug;
    const newsItem = await getNewsItem(newItemSlug);

    if (!newsItem) {
        notFound();
    }

    return (
        <div className="fullscreen-image">
            <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
    );
}