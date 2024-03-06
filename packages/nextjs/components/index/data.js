import benefitTwoImg from "../../public/benefit-two.png";
import benefitOneImg from "../../public/warrior.png";
import {
  AdjustmentsHorizontalIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  FaceSmileIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

const benefitOne = {
  title: "El primer peso MXN decentralizado",
  desc: "$XOC es la encarnación digital del peso mexicano gracias a los contratos inteligentes. Sin intermediarios, esto significa que está libre de control gubernamental o bancario. Así, los usuarios pueden realizar transacciones de manera rápida y segura, sin importar su ubicación.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Tu moneda, en código en la red:",
      desc: "Es la evolución natural del dinero digital.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Transacciones ágiles y seguras:",
      desc: "Con presencia en las redes de Polygon, Gnosis Chain y Optimism, $XOC garantiza rapidez y seguridad en cada transacción.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Sin intermediarios:",
      desc: "Libre de la influencia gubernamental o bancaria, $XOC te ofrece autonomía y libertad financiera.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Desarrollado por La DAO",
  desc: "En el corazón de Scaffold-XOC late el espíritu de una comunidad dedicada a forjar un sistema financiero abierto y descentralizado. La DAO representa una organización autónoma descentralizada que lidera el camino en la construcción de soluciones innovadoras en DeFi.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Construyendo con herramientas Web3:",
      desc: "Nuestro arsenal está compuesto por las mejores herramientas de Web3, desde OpenZeppelin hasta Scaffold-Eth-2, pasando por DAOHaus y Safe, entre muchas otras. Cada una de estas herramientas es una pieza clave en la construcción de un futuro financiero más inclusivo y accesible.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Una nueva era de democracia financiera:",
      desc: "Cada línea de código, cada reunión, cada decisión está orientada hacia la creación de un sistema financiero más equitativo y transparente. Nos comprometemos a impulsar una revolución financiera que brinde oportunidades para todos, sin importar su origen o situación económica.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Encuentra un mentor, o sé el mentor que siempre quisiste tener:",
      desc: "En La DAO, valoramos el crecimiento personal y profesional. Estamos aquí para guiar y apoyar a aquellos que desean contribuir y aprender. ¡Únete a nosotros y sé parte de esta emocionante jornada hacia un futuro financiero más brillante y equitativo!",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
