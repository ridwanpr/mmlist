import MobileNav from "../Components/UI/MobileNav";

const FrontLayout = ({ children }) => {
    return (
        <div className="relative min-h-screen bg-background">
            <main>{children}</main>
            <div>
                <MobileNav />
            </div>
        </div>
    );
};

export default FrontLayout;
