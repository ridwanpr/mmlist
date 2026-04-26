import Hero from "../../Components/Home/Hero";
import FrontLayout from "../../Layouts/FrontLayout";

const Home = () => {
    return (
        <>
            <Hero />
        </>
    );
};

Home.layout = (page) => <FrontLayout>{page}</FrontLayout>;

export default Home;
