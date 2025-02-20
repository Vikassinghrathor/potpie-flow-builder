
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
    <div className="bg-[#363636] text-white font-medium w-full pt-[11px] pb-0.5">
      <div className="flex w-full flex-col px-[13px] max-md:pr-5">
        <h2 className="text-xl font-bold">cart_campaign</h2>

        <div className="flex items-center gap-2 mt-6">
          <img
            src="check-circle.svg"
            className="w-4 h-4"
            alt="Check"
          />
          <span>Last 2 commits scanned</span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <img
            src="check-circle.svg"
            className="w-4 h-4"
            alt="Check"
          />
          <span>5 entry points identified</span>
        </div>

        <h3 className="mt-5">Selected flow</h3>
        <div className="rounded border flex justify-between items-center mt-3 p-3 border-[#D9D9D9]">
          <span>POST /carts/{"{carts_id}"}</span>
          <img
            src="chevron-down.svg"
            className="w-3 h-3"
            alt="Expand"
          />
        </div>

        <h3 className="mt-6">Dependencies</h3>
        <p className="text-sm mt-2">
          Select the ones you want to mock
        </p>

        <div className="flex flex-col gap-4 mt-4">
          {dependencies.map(dep => (
            <div key={dep} className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded cursor-pointer ${
                  selectedDependencies.includes(dep)
                    ? "bg-[#009FF9]"
                    : "border border-[#646464]"
                }`}
                onClick={() => toggleDependency(dep)}
              />
              <span>{dep}</span>
            </div>
          ))}
        </div>

        <h3 className="mt-8">Databases</h3>
        <p className="text-sm mt-2">
          Select if you want to mock databases
        </p>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded cursor-pointer ${
                config.is_db_mocked
                  ? "bg-[#009FF9]"
                  : "border border-[#646464]"
              }`}
              onClick={() => toggleDbMock(true)}
            />
            <span>I want to mock databases</span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded cursor-pointer ${
                !config.is_db_mocked
                  ? "bg-[#009FF9]"
                  : "border border-[#646464]"
              }`}
              onClick={() => toggleDbMock(false)}
            />
            <span>I don't want to mock database</span>
          </div>
        </div>

        <h3 className="mt-6">Database Configurations</h3>
        <div className={config.is_db_mocked ? "opacity-50 pointer-events-none" : ""}>
          <div className="mt-4">
            <label className="text-sm block mb-2">Database User</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-transparent border border-[#FFAD62]"
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
            <label className="text-sm block mb-2">Database Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-transparent border border-[#FFAD62]"
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

      <div className="border-t border-[#595858] mt-8 p-4 flex justify-center">
        <button
          onClick={handleSave}
          className="bg-[#009FF9] text-white px-6 py-2 rounded shadow-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};
