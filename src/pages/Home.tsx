const Home = () => {
  return (
    <main className=" transition-colors duration-300 dark:bg-black">
      <div className="h-full flex justify-center items-center dark:text-blue-400">
        <div className="w-[95%] mt-[-4rem] max-w-[500px] flex flex-col gap-[2rem] shadow-xl p-3">
          <h3 className="text-5xl font-bold">Welcome To Task Management App</h3>
          <p className="text-2xl">
            By{" "}
            <a href="https://www.mea-tec.com/" target="_blank">
              MEATec Battery Intelligence
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};
export default Home;
