
import React, { useEffect, useState } from "react";
import { getConfiguration, getDependencies, saveConfiguration } from "@/services/api";
import { ConfigurationType } from "@/types/graph";

export const ConfigPanel = () => {
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [selectedDependencies, setSelectedDependencies] = useState<string[]>([]);
  const [config, setConfig] = useState<ConfigurationType>({
    flow: "cart_campaign",
    entities_to_mock: [],
    is_db_mocked: false,
    db_config: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deps = await getDependencies("cart_campaign");
        setDependencies(deps);
        const savedConfig = await getConfiguration("cart_campaign");
        setConfig(savedConfig);
        setSelectedDependencies(savedConfig.entities_to_mock);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      await saveConfiguration({
        ...config,
        entities_to_mock: selectedDependencies,
      });
    } catch (error) {
      console.error("Error saving configuration:", error);
    }
  };

  const toggleDependency = (dep: string) => {
    setSelectedDependencies(prev =>
      prev.includes(dep)
        ? prev.filter(d => d !== dep)
        : [...prev, dep]
    );
  };

  const toggleDbMock = (value: boolean) => {
    setConfig(prev => ({
      ...prev,
      is_db_mocked: value,
    }));
  };

  return (
    <div className="h-full overflow-auto bg-[#363636]">
      <div className="flex flex-col px-6 py-4">
        <h2 className="text-xl font-semibold text-white">cart_campaign</h2>

        <div className="flex items-center gap-2 mt-6">
          <img
            src="check-circle.svg"
            className="w-4 h-4"
            alt="Check"
          />
          <span className="text-[#E6E6E6] text-sm">Last 2 commits scanned</span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <img
            src="check-circle.svg"
            className="w-4 h-4"
            alt="Check"
          />
          <span className="text-[#E6E6E6] text-sm">5 entry points identified</span>
        </div>

        <h3 className="mt-6 text-white font-medium">Selected flow</h3>
        <div className="rounded border flex justify-between items-center mt-2 p-3 border-[#D9D9D9]">
          <span className="text-[#E6E6E6] text-sm">POST /carts/{"{carts_id}"}</span>
          <img
            src="chevron-down.svg"
            className="w-3 h-3"
            alt="Expand"
          />
        </div>

        <h3 className="mt-6 text-white font-medium">Dependencies</h3>
        <p className="text-sm text-[#E6E6E6] mt-2">
          Select the ones you want to mock
        </p>

        <div className="flex flex-col gap-3 mt-4">
          {dependencies.map(dep => (
            <div key={dep} className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded cursor-pointer flex items-center justify-center ${
                  selectedDependencies.includes(dep)
                    ? "bg-[#009FF9]"
                    : "border border-[#646464]"
                }`}
                onClick={() => toggleDependency(dep)}
              >
                {selectedDependencies.includes(dep) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-[#E6E6E6] text-sm">{dep}</span>
            </div>
          ))}
        </div>

        <h3 className="mt-8 text-white font-medium">Databases</h3>
        <p className="text-sm text-[#E6E6E6] mt-2">
          Select if you want to mock databases
        </p>

        <div className="flex flex-col gap-3 mt-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded cursor-pointer flex items-center justify-center ${
                config.is_db_mocked
                  ? "bg-[#009FF9]"
                  : "border border-[#646464]"
              }`}
              onClick={() => toggleDbMock(true)}
            >
              {config.is_db_mocked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className="text-[#E6E6E6] text-sm">I want to mock databases</span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded cursor-pointer flex items-center justify-center ${
                !config.is_db_mocked
                  ? "bg-[#009FF9]"
                  : "border border-[#646464]"
              }`}
              onClick={() => toggleDbMock(false)}
            >
              {!config.is_db_mocked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className="text-[#E6E6E6] text-sm">I don't want to mock database</span>
          </div>
        </div>

        <h3 className="mt-6 text-white font-medium">Database Configurations</h3>
        <div className={config.is_db_mocked ? "opacity-50 pointer-events-none" : ""}>
          <div className="mt-4">
            <label className="text-sm text-[#E6E6E6] block mb-2">Database User</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-transparent border border-[#FFAD62] text-[#E6E6E6]"
              value={config.db_config.username}
              onChange={e => setConfig(prev => ({
                ...prev,
                db_config: {
                  ...prev.db_config,
                  username: e.target.value,
                },
              }))}
            />
          </div>
          <div className="mt-4">
            <label className="text-sm text-[#E6E6E6] block mb-2">Database Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-transparent border border-[#FFAD62] text-[#E6E6E6]"
              value={config.db_config.password}
              onChange={e => setConfig(prev => ({
                ...prev,
                db_config: {
                  ...prev.db_config,
                  password: e.target.value,
                },
              }))}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-[#595858] mt-8 p-4 sticky bottom-0 bg-[#363636] flex justify-center">
        <button
          onClick={handleSave}
          className="bg-[#009FF9] text-white px-6 py-2 rounded-md hover:bg-[#008CE0] transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};
