import ServiciosNX from "../components/nx/ServiciosNX";
import PortafolioNX from "../components/nx/PortafolioNX";
import ProcesoNX from "../components/nx/ProcesoNX";
import FaqNX from "../components/nx/FaqNX";
import ContactoNX from "../components/nx/ContactoNX";

/** Everything below the hero; loaded as its own chunk so the first paint only needs the hero. */
export default function HomeSections() {
  return (
    <>
      <ServiciosNX />
      <PortafolioNX />
      <ProcesoNX />
      <FaqNX />
      <ContactoNX />
    </>
  );
}
