// import Link from "next/link";

// import NewsList from "@/components/news-list";
// import {
//     getAvailableNewsMonths,
//     getAvailableNewsYears,
//     getNewsForYear,
//     getNewsForYearAndMonth
// } from "@/lib/news";

// export default async function FilteredNewsPage({ params }) {
//     const filter = (await params).filter;

//     console.log('Params:', params);
//     console.log('Filter:', (await params)?.filter);

//     // filter ? filter[0] : undefined = filter?.[0]
//     // const selectedYear = filter ? filter[0] : undefined
//     const selectedYear = filter?.[0];
//     const selectedMonth = filter?.[1];

//     let news;
//     let links = getAvailableNewsYears();

//     // 년도만 선택했을 때
//     if (selectedYear && !selectedMonth) {
//         news = getNewsForYear(selectedYear);
//         links = getAvailableNewsMonths(selectedYear);
//     }

//     // 년도와 달 모두 선택했을 때
//     if(selectedYear && selectedMonth) {
//         news =  getNewsForYearAndMonth(selectedYear, selectedMonth);
//         links = [];
//     }

//     let newsContent = <p>No news found for the selected period.</p>;

//     //뉴스 기사가 있으면 NewsList를 표출
//     if (news && news.length > 0) {
//         newsContent = <NewsList news={news} />;
//     }

//     //선택한 년도와 달의 유효성 검사
//     if(
//         (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
//         (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))
//     ) {
//         throw new Error('Invalid filter.');
//     }

//     return (
//         <>
//             <header id="archive-header">
//                 <nav>
//                     <ul>
//                         {links.map((link) => {
//                             const href = selectedYear
//                             ? `/archive/${selectedYear}/${link}`
//                             : `/archive/${link}`;

//                             return(
//                                 <li key={link}>
//                                     <Link href={href}>{link}</Link>
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                 </nav>
//             </header>
//             {newsContent}
//         </>
//     );
// }

/*------------------------------------------------------------------------------- */

import Link from "next/link";

import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import { Suspense } from "react";

async function FilterHeader({ year, month }) {
    const availableYears = await getAvailableNewsYears();
    let links = availableYears;

    //선택한 년도와 달의 유효성 검사
    if (
        (year && !availableYears.includes(year)) ||
        (month && !getAvailableNewsMonths(year).includes(month))
    ) {
        throw new Error("Invalid filter.");
    }

    // 년도만 선택했을 때
    if (year && !month) {
        links = getAvailableNewsMonths(year);
    }

    // 년도와 달 모두 선택했을 때
    if (year && month) {
        links = [];
    }
    return(
    <header id="archive-header">
        <nav>
            <ul>
                {links.map((link) => {
                    const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;

                    return (
                        <li key={link}>
                            <Link href={href}>{link}</Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    </header>
    );
}

async function FilteredNews({ year, month }) {
    let news;

    if (year && !month) {
        news = await getNewsForYear(year);
    } else if (year && month) {
        news = await getNewsForYearAndMonth(year, month);
    }

    let newsContent = <p>No news found for the selected period.</p>;

    //뉴스 기사가 있으면 NewsList를 표출
    if (news && news.length > 0) {
        newsContent = <NewsList news={news} />;
    }

    return newsContent;
}

export default async function FilteredNewsPage({ params }) {
    // const filter = (await params).filter;
    const { filter } = params;

    console.log("Params:", params);
    console.log("Filter:", (await params)?.filter);

    // filter ? filter[0] : undefined = filter?.[0]
    // const selectedYear = filter ? filter[0] : undefined
    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1];

    

    return (
        <>
            {/* <Suspense fallback={<p>Loading Filter...</p>}>
            </Suspense> */}
            <Suspense fallback={<p>Loading news...</p>}>
                <FilterHeader year={selectedYear} month={selectedMonth}/>
                <FilteredNews year={selectedYear} month={selectedMonth} />
            </Suspense>
        </>
    );
}
