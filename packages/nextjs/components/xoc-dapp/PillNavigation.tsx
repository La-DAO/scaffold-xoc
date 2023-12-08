import React from "react";

interface PillNavigationProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const PillNavigation: React.FC<PillNavigationProps> = ({ selectedTab, setSelectedTab }) => {
  const tabs = [
    { id: "deposit", label: "Deposit" },
    { id: "mint", label: "Mint" },
    { id: "redeem", label: "Redeem" },
    { id: "withdraw", label: "Withdraw" },
    { id: "exchange", label: "Exchange" },
  ];

  const tabStyle = {
    base: "inline-block p-4 hover:text-gray-600 hover:bg-primary dark:hover:bg-base-100 dark:hover:text-gray-300",
    selected: "inline-block p-4 text-blue-600 bg-gray-100 active dark:bg-base-100 dark:text-green-400",
    disabled: "inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500",
  };

  const handleTabClick = (id: string) => {
    setSelectedTab(id);
  };

  return (
    <div className=" flex focus-within:to-30% m-auto justify-center text-center mt-24 border-2 rounded-md border-collapse w-fit dark:border-bg-base-200">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {tabs.map(tab => (
          <li key={tab.id} className="mr-2">
            <a
              href="#"
              onClick={() => handleTabClick(tab.id)}
              className={`${
                tab.id === selectedTab ? tabStyle.selected : tab.id === "disabled" ? tabStyle.disabled : tabStyle.base
              }`}
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PillNavigation;
