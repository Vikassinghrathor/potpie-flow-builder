
import React from "react";
import { FlowSidebar } from "@/components/flows/FlowSidebar";
import { FlowCanvas } from "@/components/flows/FlowCanvas";
import { ConfigPanel } from "@/components/flows/ConfigPanel";

const Index = () => {
  return (
    <div className="bg-[#1E1E1E] flex h-screen w-full">
      <FlowSidebar />
      <div className="flex-1 flex flex-col">
        <div className="bg-[#363636] text-white font-medium px-6 py-4 border-b border-[#505050]">
          Configure Flows
        </div>
        <div className="flex flex-1">
          <div className="w-[75%] bg-[#141A20]">
            <FlowCanvas />
          </div>
          <div className="w-[25%] border-l border-[#505050]">
            <ConfigPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
