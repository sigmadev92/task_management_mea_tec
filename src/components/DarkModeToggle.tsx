// src/components/DarkModeToggle.tsx
import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useDarkMode } from "../hooks/useDarkMode";

const DarkModeToggle = () => {
  const { isDark, toggleTheme } = useDarkMode();

  return (
    <div className="flex items-center gap-2">
      <SunOutlined className="text-yellow-400" />
      <Switch
        checked={isDark}
        onChange={toggleTheme}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
      />
      <MoonOutlined className="text-blue-400" />
    </div>
  );
};

export default DarkModeToggle;
