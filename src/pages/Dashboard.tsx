import NewTask from "../components/NewTask";
import ViewTasks from "../components/ViewTasks";

const Dashboard = () => {
  return (
    <main className="p-3">
      <h2>Dashboard</h2>
      <section className="md:flex p-3">
        <ViewTasks />
        <NewTask />
      </section>
    </main>
  );
};

export default Dashboard;
