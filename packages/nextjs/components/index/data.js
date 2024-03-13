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
  title: "The First Decentralized MXN Peso",
  desc: "$XOC is the digital embodiment of the Mexican peso thanks to smart contracts. Without intermediaries, this means it's free from government or banking control. Thus, users can conduct transactions quickly and securely, regardless of their location.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Your currency, encoded on the network:",
      desc: "It'S the natural evolution of digital money.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Agile and secure transactions:",
      desc: "With a presence on Polygon, Gnosis Chain, and Optimism networks, $XOC ensures speed and security in every transaction.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "No intermediaries:",
      desc: "Free from government or banking influence, $XOC offers you autonomy and financial freedom.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Developed by La DAO",
  desc: "At the heart of Scaffold-XOC lies the spirit of a community dedicated to forging an open and decentralized financial system. La DAO represents a decentralized autonomous organization that leads the way in building innovative DeFi solutions.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Building with Web3 tools:",
      desc: "Our arsenal is composed of the best Web3 tools, from OpenZeppelin to Scaffold-Eth-2, passing through DAOHaus and Safe, among many others. Each of these tools is a key piece in building a more inclusive and accessible financial future.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "A new era of financial democracy:",
      desc: "Every line of code, every meeting, every decision is oriented towards creating a fairer and more transparent financial system. We are committed to driving a financial revolution that provides opportunities for everyone, regardless of their background or economic situation.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Find a mentor, or be the mentor you always wanted to have:",
      desc: "At La DAO, we value personal and professional growth. We are here to guide and support those who wish to contribute and learn. Join us and be part of this exciting journey towards a brighter and more equitable financial future!",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
