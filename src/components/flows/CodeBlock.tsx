import React from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import nodeicon from "../../assets/nodeicon.png"
// Custom code block component for nodes
const CodeBlock = ({
  fileName,
  functionName,
  dependencies = [],
  params = [],
  responseObject,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between bg-[#282828] px-3 py-2 border-b border-[#404040]">
        <span className="text-[13px] text-white font-medium">{fileName}</span>
        <img src={nodeicon} className="w-4 h-4 cursor-pointer text-gray-400 hover:text-white transition-colors" />
      </div>
      <div className="p-4">
        <div className="text-[13px] text-white font-medium">{functionName}</div>
        <div className="mt-3 space-y-1">
          {dependencies.length > 0 && (
            <div className="text-[#FFAD62] text-xs font-medium">
              "DependentLibs": [{dependencies.map((d) => `"${d}"`).join(", ")}]
            </div>
          )}
          {params.length > 0 && (
            <div className="text-[#FFAD62] text-xs font-medium">
              "Params": [{params.map((p) => `"${p}"`).join(", ")}]
            </div>
          )}
          {responseObject && (
            <div className="text-[#FFAD62] text-xs font-medium">
              "ResponseObject": "{responseObject}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sample data for the flow that matches your screenshot
const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 250 },
    data: {
      label: (
        <CodeBlock
          fileName="cart_router.py"
          functionName="add_item_to_cart"
          dependencies={["sqlalchemy"]}
          params={["user_id", "item", "db"]}
          responseObject="JSONResponse"
        />
      ),
    },
    style: {
      background: "#1E1E1E",
      border: "1px solid #FF9F43",
      borderRadius: "4px",
      padding: 0,
      width: 280,
      fontSize: "13px",
      color: "#FFAD62",
    },
  },
  {
    id: "2",
    position: { x: 450, y: 150 },
    data: {
      label: (
        <CodeBlock
          fileName="cart_service.py"
          functionName="add_item_to_cart"
          dependencies={["sqlalchemy"]}
          params={["user_id", "item", "db", "quantity"]}
          responseObject="CartItem"
        />
      ),
    },
    style: {
      background: "#1E1E1E",
      border: "1px solid #FF9F43",
      borderRadius: "4px",
      padding: 0,
      width: 280,
      fontSize: "13px",
      color: "#FFAD62",
    },
  },
  {
    id: "3",
    position: { x: 450, y: 450 },
    data: {
      label: (
        <CodeBlock
          fileName="cart_service.py"
          functionName="add_freebie_if_applicable"
          dependencies={["sqlalchemy"]}
          params={["cart_id", "product_id", "db"]}
          responseObject="True"
        />
      ),
    },
    style: {
      background: "#1E1E1E",
      border: "1px solid #FF9F43",
      borderRadius: "4px",
      padding: 0,
      width: 280,
      fontSize: "13px",
      color: "#FFAD62",
    },
  },
  {
    id: "4",
    position: { x: 800, y: 100 },
    data: {
      label: (
        <CodeBlock
          fileName="cart_crud.py"
          functionName="update_inventory"
          dependencies={["sqlalchemy"]}
          params={["product_id", "quantity"]}
          responseObject="None"
        />
      ),
    },
    style: {
      background: "#1E1E1E",
      border: "1px solid #FF9F43",
      borderRadius: "4px",
      padding: 0,
      width: 280,
      fontSize: "13px",
      color: "#FFAD62",
    },
  },
  {
    id: "5",
    position: { x: 800, y: 300 },
    data: {
      label: (
        <CodeBlock
          fileName="product_client.py"
          functionName="add_freebie_if_applicable"
          dependencies={["sqlalchemy"]}
          params={["product_id", "product_db", "quantity"]}
          responseObject="CartItem"
        />
      ),
    },
    style: {
      background: "#1E1E1E",
      border: "1px solid #FF9F43",
      borderRadius: "4px",
      padding: 0,
      width: 280,
      fontSize: "13px",
      color: "#FFAD62",
    },
  },
  {
    id: "6",
    position: { x: 800, y: 500 },
    data: {
      label: (
        <CodeBlock
          fileName="cart_crud.py"
          functionName="get_freebie_mapping"
          dependencies={["sqlalchemy"]}
          params={["product_id", "db"]}
          responseObject="FreebieMapping"
        />
      ),
    },
    style: {
      background: "#1E1E1E",
      border: "1px solid #FF9F43",
      borderRadius: "4px",
      padding: 0,
      width: 280,
      fontSize: "13px",
      color: "#FFAD62",
    },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    style: { stroke: "#FF9F43", strokeWidth: 1 },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    type: "smoothstep",
    style: { stroke: "#FF9F43", strokeWidth: 1 },
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    type: "smoothstep",
    style: { stroke: "#FF9F43", strokeWidth: 1 },
  },
  {
    id: "e2-5",
    source: "2",
    target: "5",
    type: "smoothstep",
    style: { stroke: "#FF9F43", strokeWidth: 1 },
  },
  {
    id: "e3-6",
    source: "3",
    target: "6",
    type: "smoothstep",
    style: { stroke: "#FF9F43", strokeWidth: 1 },
  },
];

