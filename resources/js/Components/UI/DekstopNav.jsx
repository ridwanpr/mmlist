import { Link } from "@inertiajs/react";

const DekstopNav = () => {
    return (
        <div className="bg-surface flex w-full items-center justify-between p-4">
            <Link className="font-serif text-2xl font-bold tracking-wider">
                Mamorulist
            </Link>
            <nav>
                <ul className="flex items-center gap-6">
                    <li>
                        <Link className="text-sm">Home</Link>
                    </li>
                    <li>
                        <Link className="text-sm">Browse Anime</Link>
                    </li>
                    <li>
                        <Link className="text-sm">Trigger List</Link>
                    </li>
                    <li>
                        <Link className="text-sm">About</Link>
                    </li>
                    <li>
                        <Link className="text-sm">FAQ</Link>
                    </li>
                    <li>
                        <Link className="text-sm">Contact</Link>
                    </li>
                </ul>
            </nav>
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    className="border border-primary rounded-md px-2 py-1"
                    placeholder="Search anime..."
                />
                <Link className="bg-primary text-surface rounded-md p-2 text-sm">
                    Sign Up/In
                </Link>
            </div>
        </div>
    );
};

export default DekstopNav;
