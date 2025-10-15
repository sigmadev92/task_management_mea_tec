import { ConfigProvider, theme } from "antd";
import { useDarkMode } from "../hooks/useDarkMode";

const AppThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isDark } = useDarkMode();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AppThemeWrapper;
