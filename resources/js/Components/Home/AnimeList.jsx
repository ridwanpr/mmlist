import { Link } from "@inertiajs/react";
import { LuChevronRight, LuFlame, LuRadio, LuSkull } from "react-icons/lu";

const AnimeList = () => {
    return (
        <div className="p-4 lg:px-16 lg:py-8">
            <div className="flex items-center justify-between">
                <h2 className="mb-2 flex items-center gap-2 font-bold">
                    <LuRadio size="32px" className="text-primary" /> Now Airing
                </h2>
                <Link className="flex items-center">
                    View All <LuChevronRight />
                </Link>
            </div>
            <section id="now-airing" className="mb-4">
                <div className="gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-surface border-surface-alt mb-4 flex gap-2 rounded-lg border p-2 lg:mb-0">
                        <div className="flex-1">
                            <img
                                src="/assets/img/img-anime.png"
                                alt="image"
                                className="rounded-lg object-cover"
                            />
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <p className="font-bold">Anime Title Here</p>
                            <p className="text-sm">12 Episodes</p>
                            <div className="flex flex-wrap gap-1">
                                <Link className="border-primary-soft w-fit rounded-full border px-2 py-0.5 text-xs">
                                    Trigger
                                </Link>
                                <Link className="border-primary-soft w-fit rounded-full border px-2 py-0.5 text-xs">
                                    Trigger
                                </Link>
                                <Link className="border-primary-soft w-fit rounded-full border px-2 py-0.5 text-xs">
                                    Trigger
                                </Link>
                                <Link className="border-primary-soft w-fit rounded-full border px-2 py-0.5 text-xs">
                                    +3 More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex items-center justify-between">
                <h2 className="mb-2 flex items-center gap-2 font-bold">
                    <LuFlame size="32px" className="text-primary" /> Hot Anime
                </h2>
                <Link className="flex items-center">
                    View All <LuChevronRight />
                </Link>
            </div>

            <section id="hot" className="mb-4"></section>
        </div>
    );
};

export default AnimeList;
