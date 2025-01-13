import Link from "next/link";

import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";

export default async function FilteredNewsPage({ params }) {
    const filter = (await params).filter;

    console.log('Params:', params);
    console.log('Filter:', (await params)?.filter);

    // filter ? filter[0] : undefined = filter?.[0]
    // const selectedYear = filter ? filter[0] : undefined
    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1];

    let news;
    let links = getAvailableNewsYears();

    // 년도만 선택했을 때
    if (selectedYear && !selectedMonth) {
        news = getNewsForYear(selectedYear);
        links = getAvailableNewsMonths(selectedYear);
    }

    // 년도와 달 모두 선택했을 때
    if(selectedYear && selectedMonth) {
        news = getNewsForYearAndMonth(selectedYear, selectedMonth);
        links = [];
    }
    
    let newsContent = <p>No news found for the selected period.</p>;

    //뉴스 기사가 있으면 NewsList를 표출
    if (news && news.length > 0) {
        newsContent = <NewsList news={news} />;
    }

    //선택한 년도와 달의 유효성 검사
    if(
        (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) || 
        (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))
    ) {
        throw new Error('Invalid filter.');
    }

    return (
        <>
            <header id="archive-header">
                <nav>
                    <ul>
                        {links.map((link) => {
                            const href = selectedYear 
                            ? `/archive/${selectedYear}/${link}` 
                            : `/archive/${link}`;
                            
                            return(
                                <li key={link}>
                                    <Link href={href}>{link}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </header>
            {newsContent}
        </>
    );
}
