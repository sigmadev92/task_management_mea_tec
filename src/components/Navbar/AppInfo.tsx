const AppInfo = () => {
  return (
    <div id="info" className="flex gap-1 items-center">
      <div id="logo" className="w-[2rem] h-[2rem] rounded-full overflow-hidden">
        <img
          src="/mea_tec_inc_logo.jpg"
          alt="company"
          className="w-full h-full"
        />
      </div>
      <div
        id="text"
        className="flex flex-col justify-center gap-0.5 h-[90%] dark:text-white"
      >
        <h1>Tasker</h1>
        <p className="font-bold text-[0.9rem]">by MEA Tec</p>
      </div>
    </div>
  );
};

export default AppInfo;
