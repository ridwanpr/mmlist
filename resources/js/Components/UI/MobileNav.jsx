import { LuBookmark, LuHouse, LuList, LuSearch, LuUser } from "react-icons/lu";

const MobileNav = () => {
    return (
        <div className="bg-surface border-border fixed bottom-0 left-0 z-50 w-full border-t px-6 py-4">
            <nav>
                <ul className="flex items-center justify-between gap-4">
                    <li className="flex flex-col items-center">
                        <LuHouse size="20px" />
                        <span className="text-text text-xs">Home</span>
                    </li>
                    <li className="flex flex-col items-center">
                        <LuSearch size="20px" />
                        <span className="text-text text-xs">Browse</span>
                    </li>
                    <li className="flex flex-col items-center">
                        <LuList size="20px" />
                        <span className="text-text text-xs">Trigger</span>
                    </li>
                    <li className="flex flex-col items-center">
                        <LuBookmark size="20px" />
                        <span className="text-text text-xs">Watchlist</span>
                    </li>
                    <li className="flex flex-col items-center">
                        <LuUser size="20px" />
                        <span className="text-text text-xs">Profile</span>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default MobileNav;
