import DekstopNav from "../Components/UI/DekstopNav";
import Footer from "../Components/UI/Footer";
import MobileNav from "../Components/UI/MobileNav";

const FrontLayout = ({ children }) => {
  return (
    <>
      <div className="relative min-h-screen">
        <div>
          <DekstopNav />
        </div>
        <main className="max-w-7xl mx-auto">{children}</main>
        <div className="lg:hidden">
          <MobileNav />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FrontLayout;
