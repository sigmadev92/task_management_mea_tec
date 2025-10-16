import { GithubFilled } from "@ant-design/icons";

import NavItems from "./NavItems";
import ToggleButton from "./ToggleButton";

const RightSideItems = () => {
  return (
    <div className="flex gap-[1rem] items-center">
      {/* <DarkModeToggle /> */}
      <div className="bg-white rounded-full flex pt-[2px] px-1">
        <a
          href="https://github.com/sigmadev92/task_management_mea_tec"
          target="_blank"
        >
          <GithubFilled className="text-[1.3rem]" style={{ color: "black" }} />
        </a>
      </div>
      <ToggleButton />
      <NavItems />
    </div>
  );
};

export default RightSideItems;
