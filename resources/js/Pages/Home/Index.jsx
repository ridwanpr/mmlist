import Hero from "../../Components/Home/Hero";
import AnimeList from "../../Components/Home/AnimeList";
import FrontLayout from "../../Layouts/FrontLayout";

const Home = () => {
    return (
        <>
            <Hero />
            <AnimeList />
        </>
    );
};

Home.layout = (page) => <FrontLayout>{page}</FrontLayout>;

export default Home;
