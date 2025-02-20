
import React from "react";
import { FlowSidebar } from "@/components/flows/FlowSidebar";
import { FlowCanvas } from "@/components/flows/FlowCanvas";
import { ConfigPanel } from "@/components/flows/ConfigPanel";

const Index = () => {
  return (
    <div className="bg-[#1E1E1E] flex h-screen overflow-hidden">
      <FlowSidebar />
      <div className="flex-1">
        <div className="bg-[#363636] text-white font-medium px-6 py-4 border-b border-[#505050]">
          Configure Flows
        </div>
        <div className="flex h-[calc(100vh-64px)]">
          <div className="w-3/4 bg-[#141A20]">
            <FlowCanvas />
          </div>
          <div className="w-1/4 border-l border-[#505050]">
            <ConfigPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
