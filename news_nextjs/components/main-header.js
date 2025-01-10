import Link from "next/link";

export default function MainHeader () {
    return <>
        <h1>Main Header</h1>
        <Link href='/'>Home</Link>
        <Link href='/news'>News</Link>
    </>
}