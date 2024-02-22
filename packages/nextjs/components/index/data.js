import benefitOneImg from "../../public/benefit-one.png";
import benefitTwoImg from "../../public/benefit-two.png";
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
  desc: "Por medio de contratos inteligentes, $XOC se convierte en una peso MXN digital sin intermediarios de por medio, lo que significa que no está controlada por ningún gobierno o banco central. Esto permite a los usuarios enviar y recibir dinero de forma rápida y segura, sin importar dónde se encuentren.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Tu moneda es codigo en el internet",
      desc: "Es la siguiente evolución del dinero en linea.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Transacciones rápidas y seguras",
      desc: "Estamos en las redes de Polygon, Gnosis Chain y Optimism.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Sin intermediarios de por medio",
      desc: "No está controlada por ningún gobierno o banco central.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Construida por La DAO",
  desc: "Todo surge desde una comunidad de personas que buscan construir un sistema financiero abierto y descentralizado. La DAO es una organización autónoma descentralizada que se encarga de gestionar todo el trabajo requerido para construir en DeFi.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Construimos usando herramientas Web3",
      desc: "OpenZeppelin, Scaffold-Eth-2, DaoHaus, Safe y muchas mas...",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Una nueva democracia financiera",
      desc: "Todo el trabajo esta direccionado a construir una nueva forma mas justa de hacer finanzas.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Encuentra un mentor, o se el que nunca tuviste",
      desc: "Nos encanta onboardear mas y mas gente dispuesta a contribuir.",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
