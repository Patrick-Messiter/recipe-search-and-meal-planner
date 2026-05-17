import Link from "next/link"

interface NavBarProps {
    onSurpriseMe: () => void;
}

export default function NavBar({ onSurpriseMe }: NavBarProps) {
    return (
        <nav className="w-full h-20 flex justify-center bg-primary-green-600">
            <div className="w-3/4 h-full flex justify-between items-center">
                <header className="w-1/2">
                    <h2 className="text-primary-green-400 text-4xl font-semibold">Easy Meal</h2>
                </header>
                <div className="w-1/4 flex justify-between">
                    <Link className="text-primary-green-400 hover:text-primary-green-200 font-bold" href="/">Search</Link>
                    <Link className="text-primary-green-400 hover:text-primary-green-200 font-bold" href="/shopping-list">Shopping List</Link>
                    <button onClick={onSurpriseMe} className="text-primary-green-400 hover:text-primary-green-200 font-bold" href="/">Surprise Me</button>
                </div>
            </div>
        </nav>
    );
}