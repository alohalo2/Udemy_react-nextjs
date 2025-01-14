// 기본적으로 react에서 data fetching 하는 방법
// 'use client';

// import { useEffect, useState } from "react";

// import NewsList from "@/components/news-list";

// export default function NewsPage() {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState();
//     const [news, setNews] = useState();

//     useEffect(() => {
//         setIsLoading(true);
//         async function fetchNews() {
//             const response = await fetch('http://localhost:8080/news');

//             if(!response.ok) {
//                 setError('Failed to fetch news.');
//                 setIsLoading(false);
//             }

//             const news = await response.json();
//             setIsLoading(false);
//             setNews(news);
//         }

//         fetchNews();
//     },[]);


//     if(isLoading) {
//         return <p>Loading...</p>;
//     }

//     if(error) {
//         return <p>{error}</p>
//     }

//     let newsContent;

//     if(news) {
//         newsContent = <NewsList news={news} />
//     }

//     return (
//         <>
//             <h1>News Page</h1>
//             {newsContent}
//         </>
//     );
// }

/*--------------------------------------------------------------------------------- */

//NextJs에서 표준 data fetching 방법: server component에서 바로 fetching
// import NewsList from "@/components/news-list";

// export default async function NewsPage() {
//     const response = await fetch('http://localhost:8080/news');

//     if(!response.ok) {
//         throw new Error('Failed to fetch news.');
//     }

//     const news = await response.json();

//     return (
//         <>
//             <h1>News Page</h1>
//             <NewsList news={news} />
//         </>
//     );
// }

/*------------------------------------------------------------------- */

//데이터 소스에서 직접 가져오는 방법 : 서버 컴포넌트에서만 작동
import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
    const news = await getAllNews();

    return (
        <>
            <h1>News Page</h1>
            <NewsList news={news} />
        </>
    );
}
