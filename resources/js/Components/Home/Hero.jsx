import { LuList, LuSearch } from "react-icons/lu";

const Hero = () => {
    return (
        <>
            <div className="p-4 md:flex md:justify-between relative">
                <div className="md:flex-1">
                    <h1 className="font-serif text-3xl font-bold tracking-wid mb-2 max-w-[80%]">
                        Know what to expect.
                        <span className="text-primary ml-2">
                            Enjoy what you love.
                        </span>
                    </h1>
                    <p className="text-sm">
                        Mamorulist provides trigger warning information for
                        anime so you can protect your peace of mind and enjoy
                        what matters to you.
                    </p>
                </div>
                <div className="hidden md:flex md:flex-1">
                    <img src="/assets/img/img-anime.png" alt="" />
                </div>
            </div>
            <div className="flex flex-col p-4 pt-0 gap-4">
                <button className="mm-btn-primary p-4 flex items-center justify-center gap-2">
                    <LuSearch /> Browse Anime
                </button>
                <button className="mm-btn-secondary p-4 flex items-center justify-center gap-2">
                    <LuList /> View Trigger List
                </button>
            </div>
        </>
    );
};

export default Hero;
