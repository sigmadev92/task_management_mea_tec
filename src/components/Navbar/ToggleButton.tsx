import { MoonFilled, SunFilled } from "@ant-design/icons";
import { themeActions } from "../../redux_toolkit/reducers/theme/themeSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux_toolkit/store/hooks";

const ToggleButton = () => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => {
        dispatch(themeActions.setTheme(theme));
      }}
      className="rounded-md bg-gray-500 text-white dark:bg-white dark:text-black cursor-pointer text-[1rem] px-1"
    >
      {theme === "light" ? <MoonFilled /> : <SunFilled />}
    </button>
  );
};

export default ToggleButton;
