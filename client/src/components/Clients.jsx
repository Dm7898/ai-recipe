import client1 from "/client-1.svg";
import client2 from "/client-2.svg";
import client3 from "/client-3.svg";
import client4 from "/client-4.svg";
const Clients = () => {
  return (
    <section className="clients">
      <div className="container mx-auto px-2 sm:px-4 flex flex-wrap justify-around lg:justify-between py-20 gap-5">
        <img src={client1} className="w-1/3 sm:w-1/6" alt="client" />

        <img src={client2} className="w-1/3 sm:w-1/6" alt="client" />

        <img src={client3} className="w-1/3 sm:w-1/6" alt="client" />

        <img src={client4} className="w-1/3 sm:w-1/6" alt="client" />
      </div>
    </section>
  );
};

export default Clients;
