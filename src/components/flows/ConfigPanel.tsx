import React, { useEffect, useState } from "react";
import {
  getConfiguration,
  getDependencies,
  saveConfiguration,
} from "@/services/api";
import { ConfigurationType } from "@/types/graph";
import Downarrow from "../../assets/Polygon 3.svg";
import checkboxicon from "../../assets/Group 65.svg";
import TextField from "@mui/material/TextField";

// Update the type definition to include hostname
interface DbConfig {
  username: string;
  password: string;
  hostname: string;
}

// Extend the ConfigurationType to use our updated DbConfig
interface ExtendedConfigurationType
  extends Omit<ConfigurationType, "db_config"> {
  db_config: DbConfig;
}

export const ConfigPanel = () => {
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [selectedDependencies, setSelectedDependencies] = useState<string[]>(
    []
  );
  const [config, setConfig] = useState<ExtendedConfigurationType>({
    flow: "cart_campaign",
    entities_to_mock: [],
    is_db_mocked: false,
    db_config: {
      username: "",
      password: "",
      hostname: "", // Now properly typed
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deps = await getDependencies("cart_campaign");
        setDependencies(
          deps || [
            "httpx",
            "product_client",
            "sqlalchemy.orm",
            "cart_crud",
            "cartModel",
          ]
        );
        const savedConfig = await getConfiguration("cart_campaign");
        // Cast the savedConfig to match our extended type
        setConfig(savedConfig as ExtendedConfigurationType);
        setSelectedDependencies(
          savedConfig.entities_to_mock || ["httpx", "product_client"]
        );
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
    setSelectedDependencies((prev) =>
      prev.includes(dep) ? prev.filter((d) => d !== dep) : [...prev, dep]
    );
  };

  const toggleDbMock = (value: boolean) => {
    setConfig((prev) => ({
      ...prev,
      is_db_mocked: value,
    }));
  };

  // Material UI custom styles
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      color: "#E6E6E6",
      "& fieldset": {
        borderColor: "#FFAD62",
      },
      "&:hover fieldset": {
        borderColor: "#FFAD62",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFAD62",
      },
      backgroundColor: "#363636",
    },
    "& .MuiInputLabel-root": {
      color: "#A4A4A4",
      "&.Mui-focused": {
        color: "#FFAD62",
      },
    },
    "& .MuiInputBase-input": {
      padding: "10px",
    },
    marginBottom: "24px",
  };

  return (
    <div className="h-full overflow-auto bg-[#363636]">
      <div className="flex flex-col px-4 py-5">
        <h2 className="text-lg font-medium text-white mb-4">cart_campaign</h2>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 flex items-center justify-center rounded-full bg-[#FF7A00] flex-shrink-0">
            <span className="text-[#FFFFFF] text-[9px] font-medium">i</span>
          </div>
          <span className="text-[#E6E6E6] text-sm">Last 2 commits scanned</span>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 flex items-center justify-center rounded-full bg-[#FF7A00] flex-shrink-0">
            <span className="text-[#FFFFFF] text-[9px] font-medium">i</span>
          </div>
          <span className="text-[#E6E6E6] text-sm">
            5 entry points identified
          </span>
        </div>

        <h3 className="text-sm text-white font-medium mb-2">Selected flow</h3>
        <div className="relative mb-6">
          <select
            className="w-full appearance-none bg-[#2E2E2E] border border-[#D9D9D9] text-[#FFFFFF] py-2 px-3 pr-8 rounded text-sm cursor-pointer focus:outline-none"
            value={config.flow}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, flow: e.target.value }))
            }
          >
            <option value="cart_campaign">POST /carts/{"{carts_id}"}</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <img src={Downarrow} alt="arrowdownlogo" />
          </div>
        </div>

        <h3 className="text-sm text-white font-medium mb-1">Dependencies</h3>
        <p className="text-xs text-[#A4A4A4] mb-4">
          Select the ones you want to mock
        </p>

        <div className="flex flex-col gap-3 mb-6">
          {(dependencies.length > 0
            ? dependencies
            : [
                "httpx",
                "product_client",
                "sqlalchemy.orm",
                "cart_crud",
                "cartModel",
              ]
          ).map((dep) => (
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
                  <img src={checkboxicon} alt="checkicon" />
                )}
              </div>
              <span className="text-[#E6E6E6] text-sm">{dep}</span>
              <div className="ml-auto">
                <img src={checkboxicon} alt="checkicon" />
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-sm text-white font-medium mb-1">Databases</h3>
        <p className="text-xs text-[#A4A4A4] mb-4">
          Select if you want to mock databases
        </p>

        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded cursor-pointer flex items-center justify-center ${
                config.is_db_mocked ? "bg-[#009FF9]" : "border border-[#646464]"
              }`}
              onClick={() => toggleDbMock(true)}
            >
              {config.is_db_mocked && (
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="text-[#E6E6E6] text-sm">
              I want to mock databases
            </span>
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
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="text-[#E6E6E6] text-sm">
              I don't want to mock database
            </span>
          </div>
        </div>

        <h3 className="text-sm text-white font-medium mb-4">
          Database Configurations
        </h3>
        <div
          className={
            config.is_db_mocked ? "opacity-50 pointer-events-none" : ""
          }
        >
          <div className="border-t border-[#3D3D3D] pt-4">
            <TextField
              id="database-user"
              label="Database User"
              variant="outlined"
              fullWidth
              placeholder="postgres"
              value={config.db_config.username}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  db_config: {
                    ...prev.db_config,
                    username: e.target.value,
                  },
                }))
              }
              sx={textFieldStyles}
              size="small"
            />

            <TextField
              id="database-password"
              label="Database Password"
              variant="outlined"
              fullWidth
              type="password"
              value={config.db_config.password}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  db_config: {
                    ...prev.db_config,
                    password: e.target.value,
                  },
                }))
              }
              sx={textFieldStyles}
              size="small"
            />

            <TextField
              id="database-hostname"
              label="Database Hostname"
              variant="outlined"
              fullWidth
              placeholder="localhost"
              value={config.db_config.hostname}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  db_config: {
                    ...prev.db_config,
                    hostname: e.target.value,
                  },
                }))
              }
              sx={textFieldStyles}
              size="small"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-[#595858] mt-4 p-4 sticky bottom-0 bg-[#363636] flex justify-end">
        <button
          onClick={handleSave}
          className="bg-[#009FF9] text-white px-10 py-2 rounded-sm hover:bg-[#0090E0] transition-colors text-sm"
        >
          Save
        </button>
      </div>
    </div>
  );
};
