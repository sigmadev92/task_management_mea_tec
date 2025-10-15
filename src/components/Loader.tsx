import React from "react";
import { Flex, Spin } from "antd";

const App: React.FC = () => {
  const [percent, setPercent] = React.useState(-50);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>(null);

  React.useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPercent((v) => {
        const nextPercent = v + 5;
        return nextPercent > 150 ? -50 : nextPercent;
      });
    }, 100);
    return () => clearTimeout(timerRef.current!);
  }, [percent]);

  const mergedPercent = percent;

  return (
    <div className="w-full h-[100vh] absolute top-0 left-0 flex justify-center items-center">
      <Flex align="center" gap="middle">
        <Spin percent={mergedPercent} size="large" />
      </Flex>
    </div>
  );
};

export default App;
