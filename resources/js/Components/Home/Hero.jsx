import {
    LuEye,
    LuLeaf,
    LuList,
    LuSearch,
    LuShield,
    LuUsers,
} from "react-icons/lu";

const Hero = () => {
    return (
        <>
            <div className="bg-background relative mx-auto max-w-screen-2xl overflow-hidden lg:flex lg:justify-between lg:gap-8">
                <div className="p-4 lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:py-16 lg:pl-16">
                    <h1 className="mb-2 font-serif text-4xl font-extrabold tracking-wide xl:text-5xl">
                        Know what to expect. {" "}
                        <span className="text-primary block sm:inline">
                            Enjoy what you love.
                        </span>
                    </h1>
                    <p className="max-w-2xl text-sm lg:text-base">
                        Mamorulist provides trigger warning information for
                        anime so you can protect your peace of mind and enjoy
                        what matters to you.
                    </p>
                    <div className="mt-6 hidden gap-4 lg:flex lg:flex-row">
                        <button className="mm-btn-primary bg-primary text-surface flex items-center justify-center gap-2 rounded-md px-6 py-3 font-semibold transition hover:cursor-pointer hover:opacity-90">
                            <LuSearch /> Browse Anime
                        </button>
                        <button className="mm-btn-secondary bg-surface text-primary border-primary flex items-center justify-center gap-2 rounded-md border px-6 py-3 font-semibold transition hover:cursor-pointer hover:bg-gray-50">
                            <LuList /> View Trigger List
                        </button>
                    </div>

                    <div
                        id="feature"
                        className="mt-12 hidden w-full max-w-4xl lg:block"
                    >
                        <div className="bg-surface border-primary-soft grid grid-cols-2 gap-6 rounded-md border p-6 xl:grid-cols-4">
                            <div className="flex items-start gap-3">
                                <LuShield
                                    size="32px"
                                    className="text-primary shrink-0"
                                />
                                <div className="flex flex-col">
                                    <p className="text-sm font-bold">
                                        Viewer First
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Your well-being comes first. Always.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <LuEye
                                    size="32px"
                                    className="text-primary shrink-0"
                                />
                                <div className="flex flex-col">
                                    <p className="text-sm font-bold">
                                        Clear & Honest
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Straightforward warnings. No
                                        sugarcoating.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <LuUsers
                                    size="32px"
                                    className="text-primary shrink-0"
                                />
                                <div className="flex flex-col">
                                    <p className="text-sm font-bold">
                                        Community Driven
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Built for anime fans, by anime fans.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <LuLeaf
                                    size="32px"
                                    className="text-primary shrink-0"
                                />
                                <div className="flex flex-col">
                                    <p className="text-sm font-bold">
                                        Respectful Space
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Everyone's experiences are valid.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex lg:w-1/2 xl:w-5/12">
                    <img
                        src="/assets/img/img-anime.png"
                        alt="hero image"
                        className="h-full min-h-125 w-full rounded-l-4xl object-cover"
                    />
                </div>
            </div>

            {/* Mobile / Tablet buttons */}
            <div className="bg-background flex flex-col gap-3 p-4 pt-0 lg:hidden">
                <button className="bg-primary text-surface flex items-center justify-center gap-2 rounded-md p-3 font-semibold">
                    <LuSearch /> Browse Anime
                </button>
                <button className="bg-surface text-primary border-primary flex items-center justify-center gap-2 rounded-md border p-3 font-semibold">
                    <LuList /> View Trigger List
                </button>
            </div>

            {/* Mobile / Tablet features */}
            <div className="flex flex-col gap-2 p-4 mt-4 lg:hidden">
                <div className="bg-background border-primary-soft flex flex-col gap-4 rounded-md border p-4">
                    <div className="border-primary-soft flex items-center gap-4 border-b pb-4">
                        <LuShield
                            size="40px"
                            className="text-primary shrink-0"
                        />
                        <div className="flex flex-col">
                            <p className="font-bold">Viewer First</p>
                            <p className="text-sm">
                                Your well-being comes first. Always.
                            </p>
                        </div>
                    </div>
                    <div className="border-primary-soft flex items-center gap-4 border-b pb-4">
                        <LuEye size="40px" className="text-primary shrink-0" />
                        <div className="flex flex-col">
                            <p className="font-bold">Clear & Honest</p>
                            <p className="text-sm">
                                Straightforward warnings. No sugarcoating.
                            </p>
                        </div>
                    </div>
                    <div className="border-primary-soft flex items-center gap-4 border-b pb-4">
                        <LuUsers
                            size="40px"
                            className="text-primary shrink-0"
                        />
                        <div className="flex flex-col">
                            <p className="font-bold">Community Driven</p>
                            <p className="text-sm">
                                Built for anime fans, by anime fans.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <LuLeaf size="40px" className="text-primary shrink-0" />
                        <div className="flex flex-col">
                            <p className="font-bold">Respectful Space</p>
                            <p className="text-sm">
                                Everyone's experiences are valid.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
