import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import HeroNX from "../components/nx/HeroNX";
import HeroMobileNX from "../components/nx/HeroMobileNX";
import { MOBILE_QUERY, useMediaQuery } from "../hooks/useMediaQuery";

const HomeSections = lazy(() => import("./HomeSections"));

export default function Home() {
  // Phones get their own hero (video); from 768px up the original hero is untouched
  const isPhone = useMediaQuery(MOBILE_QUERY);
  return (
    <motion.div initial={isPhone ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {isPhone ? <HeroMobileNX /> : <HeroNX />}
      <Suspense fallback={<div className="nx-route-fallback" />}>
        <HomeSections />
      </Suspense>
    </motion.div>
  );
}
