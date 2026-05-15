import Link from "next/link"

export default function NavBar() {
    return (
        <nav className="w-full h-20 flex justify-center">
            <div className="w-3/4 h-full flex justify-between items-center">
                <header className="w-1/2">
                    <h2>Easy Meal</h2>
                </header>
                <div className="w-1/4 flex justify-between">
                    <Link href="/">Search</Link>
                    <Link href="/">Shopping List</Link>
                    <Link href="/">Surprise Me</Link>
                </div>
            </div>
        </nav>
    );
}