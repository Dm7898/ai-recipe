import Sidebar from "./Sidebar";

const ManageLayout = ({ children }) => {
  return (
    <section className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </section>
  );
};

export default ManageLayout;
