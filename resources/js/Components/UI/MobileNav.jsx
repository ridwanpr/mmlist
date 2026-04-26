import { LuBookmark, LuHouse, LuList, LuSearch, LuUser } from "react-icons/lu";

const MobileNav = () => {
    return (
        <div className="absolute bottom-0 left-0 bg-surface border-t border-border w-full px-6 py-4 md:hidden">
            <nav>
                <ul className="flex justify-between items-center gap-4">
                    <li className="flex flex-col items-center">
                        <LuHouse size="20px" />
                        <span className="text-xs text-text">Home</span>
                    </li>
                    <li className="flex flex-col items-center">
                        <LuSearch size="20px" />
                        <span className="text-xs text-text">Browse</span>
                    </li>
                    <li className="flex flex-col items-center">
                        <LuList size="20px" />
                        <span className="text-xs text-text">Trigger List</span>
                    </li>
                    <li className="flex flex-col items-center">
                        <LuBookmark size="20px" />
                        <span className="text-xs text-text">Watchlist</span>
                    </li>
                    <li className="flex flex-col items-center">
                        <LuUser size="20px" />
                        <span className="text-xs text-text">Profile</span>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default MobileNav;
