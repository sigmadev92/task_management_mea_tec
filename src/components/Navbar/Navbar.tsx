import AppInfo from "./AppInfo";
import RightSideItems from "./RightSideItems";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-[#eff2f3] border-0 border-b-[1px]  dark:bg-black dark:border-b-white ">
      <AppInfo />
      <RightSideItems />
    </header>
  );
};

export default Navbar;
