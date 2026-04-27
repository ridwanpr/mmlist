import DekstopNav from "../Components/UI/DekstopNav";
import MobileNav from "../Components/UI/MobileNav";

const FrontLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen pb-20 lg:pb-0">
      <div className="hidden lg:flex">
        <DekstopNav />
      </div>
      <main>{children}</main>
      <div className="lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
};

export default FrontLayout;
