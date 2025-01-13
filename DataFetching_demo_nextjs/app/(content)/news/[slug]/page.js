// import Link from "next/link";
// import { notFound } from "next/navigation";

// import { DUMMY_NEWS } from "@/dummy-news";

// export default async function NewsDetailPage({ params }) {
//     const newsSlug = (await params).slug;
//     const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsSlug);

//     if(!newsItem) {
//         notFound();
//     }

//     return (
//         <article className="news-article">
//             <header>
//                 <Link href={`/news/${newsItem.slug}/image`}>
//                     <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
//                 </Link>
//                 <h1>{newsItem.title}</h1>
//                 <time dateTime={newsItem.date}>{newsItem.date}</time>
//             </header>
//             <p>{newsItem.content}</p>
//         </article>
//     );
// }

import { notFound } from "next/navigation";
import Link from "next/link";

import { getNewsItem } from "@/lib/news";

export default async function NewsDetailPage({ params }) {
    const newsSlug = (await params).slug;
    const newsItem = await getNewsItem(newsSlug);

    if(!newsItem) {
        notFound();
    }

    return (
        <article className="news-article">
            <header>
                <Link href={`/news/${newsItem.slug}/image`}>
                    <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
                </Link>
                <h1>{newsItem.title}</h1>
                <time dateTime={newsItem.date}>{newsItem.date}</time>
            </header>
            <p>{newsItem.content}</p>
        </article>
    );
}

