import { motion } from "framer-motion";
import HeroNX from "../components/nx/HeroNX";
import ServiciosNX from "../components/nx/ServiciosNX";
import PortafolioNX from "../components/nx/PortafolioNX";
import ProcesoNX from "../components/nx/ProcesoNX";
import FaqNX from "../components/nx/FaqNX";
import ContactoNX from "../components/nx/ContactoNX";

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <HeroNX />
      <ServiciosNX />
      <PortafolioNX />
      <ProcesoNX />
      <FaqNX />
      <ContactoNX />
    </motion.div>
  );
}
