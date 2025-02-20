import React from "react";
import { FlowSidebar } from "@/components/flows/FlowSidebar";
import { FlowCanvas } from "@/components/flows/FlowCanvas";
import { ConfigPanel } from "@/components/flows/ConfigPanel";

const Index = () => {
  return (
    <div className="bg-white flex items-stretch overflow-hidden flex-wrap">
      <FlowSidebar />
      <div className="grow shrink-0 basis-0 w-fit max-md:max-w-full">
        <div className="bg-[rgba(54,54,54,1)] text-base text-[#010101] font-medium px-[23px] py-[15px] border-[rgba(80,80,80,1)] border-b max-md:max-w-full max-md:px-5">
          Configure Flows
        </div>
        <div className="max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-[74%] max-md:w-full max-md:ml-0">
              <FlowCanvas />
            </div>
            <div className="w-[26%] ml-5 max-md:w-full max-md:ml-0">
              <ConfigPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
