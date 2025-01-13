// import { DUMMY_NEWS } from "@/dummy-news";

// // 모든 뉴스 데이터를 반환
// export function getAllNews() {
//     return DUMMY_NEWS;
// }

// // 최신 뉴스 3개를 반환 (배열의 앞쪽 3개)
// export function getLatestNews() {
//     return DUMMY_NEWS.slice(0, 3);
// }

// // 뉴스 데이터에 포함된 모든 연도를 내림차순으로 반환 (중복 제거)
// export function getAvailableNewsYears() {
//     return DUMMY_NEWS.reduce((years, news) => {
//         const year = new Date(news.date).getFullYear();
//         if (!years.includes(year)) {
//             years.push(year);
//         }
//         return years;
//     }, []).sort((a, b) => b - a);
// }

// // 특정 연도를 입력하면 해당 연도에 뉴스가 있는 달을 내림차순으로 반환 (중복 제거)
// export function getAvailableNewsMonths(year) {
//     return DUMMY_NEWS.reduce((months, news) => {
//         const newsYear = new Date(news.date).getFullYear();
//         if (newsYear === +year) {
//             const month = new Date(news.date).getMonth();
//             if (!months.includes(month)) {
//                 months.push(month + 1);
//             }
//         }
//         return months;
//     }, []).sort((a, b) => b - a);
// }

// // 특정 연도를 입력하면 해당 연도에 해당하는 뉴스 데이터 배열을 반환
// export function getNewsForYear(year) {
//     return DUMMY_NEWS.filter((news) => new Date(news.date).getFullYear() === +year);
// }

// // 특정 연도와 월을 입력하면 해당 연도와 월에 작성된 뉴스 데이터 배열을 반환
// export function getNewsForYearAndMonth(year, month) {
//     return DUMMY_NEWS.filter((news) => {
//         const newsYear = new Date(news.date).getFullYear();
//         const newsMonth = new Date(news.date).getMonth() + 1;
//         return newsYear === +year && newsMonth === +month;
//     });
// }

/*-------------------------------------------------------------------------- */

// import sql from "better-sqlite3";

// import { DUMMY_NEWS } from "@/dummy-news";

// const db = sql("data.db");

// // 모든 뉴스 데이터를 반환
// export async function getAllNews() {
//     const news = db.prepare("SELECT * FROM news").all();
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     return news;
// }

// // 최신 뉴스 3개를 반환 (배열의 앞쪽 3개)
// export function getLatestNews() {
//     return DUMMY_NEWS.slice(0, 3);
// }

// // 뉴스 데이터에 포함된 모든 연도를 내림차순으로 반환 (중복 제거)
// export function getAvailableNewsYears() {
//     return DUMMY_NEWS.reduce((years, news) => {
//         const year = new Date(news.date).getFullYear();
//         if (!years.includes(year)) {
//             years.push(year);
//         }
//         return years;
//     }, []).sort((a, b) => b - a);
// }

// // 특정 연도를 입력하면 해당 연도에 뉴스가 있는 달을 내림차순으로 반환 (중복 제거)
// export function getAvailableNewsMonths(year) {
//     return DUMMY_NEWS.reduce((months, news) => {
//         const newsYear = new Date(news.date).getFullYear();
//         if (newsYear === +year) {
//             const month = new Date(news.date).getMonth();
//             if (!months.includes(month)) {
//                 months.push(month + 1);
//             }
//         }
//         return months;
//     }, []).sort((a, b) => b - a);
// }

// // 특정 연도를 입력하면 해당 연도에 해당하는 뉴스 데이터 배열을 반환
// export function getNewsForYear(year) {
//     return DUMMY_NEWS.filter((news) => new Date(news.date).getFullYear() === +year);
// }

// // 특정 연도와 월을 입력하면 해당 연도와 월에 작성된 뉴스 데이터 배열을 반환
// export function getNewsForYearAndMonth(year, month) {
//     return DUMMY_NEWS.filter((news) => {
//         const newsYear = new Date(news.date).getFullYear();
//         const newsMonth = new Date(news.date).getMonth() + 1;
//         return newsYear === +year && newsMonth === +month;
//     });
// }

/*-------------------------------------------------------------------------- */

import sql from "better-sqlite3";

const db = sql("data.db");

export async function getAllNews() {
    const news = db.prepare("SELECT * FROM news").all();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return news;
}

export async function getNewsItem(slug) {
    const newsItem = db.prepare("SELECT * FROM news WHERE slug = ?").get(slug);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return newsItem;
}

export async function getLatestNews() {
    const latestNews = db.prepare("SELECT * FROM news ORDER BY date DESC LIMIT 3").all();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return latestNews;
}

export async function getAvailableNewsYears() {
    const years = db
        .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
        .all()
        .map((year) => year.year);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return years;
}

export function getAvailableNewsMonths(year) {
    return db
        .prepare("SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?")
        .all(year)
        .map((month) => month.month);
}

export async function getNewsForYear(year) {
    const news = db.prepare("SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC").all(year);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return news;
}

export async function getNewsForYearAndMonth(year, month) {
    const news = db
        .prepare("SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC")
        .all(year, month);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return news;
}
