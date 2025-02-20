import React, { useEffect } from "react";
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
import { Copy } from "lucide-react";
import { GraphNode } from "@/types/graph";
import { getGraph } from "@/services/api";
import nodeicon from "../../assets/nodeicon.png";

const createNodesAndEdges = (
  data: GraphNode[],
  parentX = 0,
  parentY = 0,
  level = 0
): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let currentY = parentY;

  data.forEach((node, index) => {
    const nodeId = `${level}-${index}`;
    const x = parentX + 300;
    const fileName = node.function.split(":")[0].split("/").pop() || "";
    const functionName = node.function.split(":")[1] || "";

    nodes.push({
      id: nodeId,
      position: { x, y: currentY },
      data: {
        label: (
          <div className="w-full">
            <div className="flex items-center justify-between bg-[#282828] px-3 py-2 border-b border-[#404040]">
              <span className="text-[13px] text-white font-medium text-left">
                {fileName}
              </span>
              <img
                src={nodeicon}
                className="w-4 h-4 cursor-pointer text-gray-400 hover:text-white transition-colors"
              />
            </div>
            <div className="p-4">
              <div className="text-[13px] text-white font-medium text-left">
                {functionName}
              </div>
              {node.params && (
                <div className="mt-3 space-y-1 text-left">
                  {node.params.some((p) => p.type) && (
                    <div>
                      <span className="text-[#FFAD62] text-xs font-medium">
                        "DependentLibs":
                      </span>
                      <span className="text-white text-xs">
                        {" "}
                        [
                        {node.params
                          .map((p) => `"${p.type}"`)
                          .filter(Boolean)
                          .join(", ")}
                        ]
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-[#FFAD62] text-xs font-medium">
                      "Params":
                    </span>
                    <span className="text-white text-xs">
                      {" "}
                      [{node.params.map((p) => `"${p.identifier}"`).join(", ")}]
                    </span>
                  </div>
                  {node.response_object && (
                    <div>
                      <span className="text-[#FFAD62] text-xs font-medium">
                        "ResponseObject":
                      </span>
                      <span className="text-white text-xs">
                        {" "}
                        "{node.response_object}"
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ),
      },
      type: "default",
      style: {
        background: "#1E1E1E",
        border: "1px solid #FF9F43",
        borderRadius: "4px",
        padding: 0,
        width: 280,
        fontSize: "13px",
      },
      className: "hover:shadow-lg transition-shadow duration-300",
    });

    if (level > 0) {
      edges.push({
        id: `e-${nodeId}`,
        source: `${level - 1}-0`,
        target: nodeId,
        type: "smoothstep",
        style: { stroke: "#FF9F43", strokeWidth: 1 },
        animated: false,
      });
    }

    if (node.children?.length > 0) {
      const childElements = createNodesAndEdges(
        node.children,
        x,
        currentY,
        level + 1
      );
      nodes.push(...childElements.nodes);
      edges.push(...childElements.edges);
      currentY += 200 * node.children.length;
    } else {
      currentY += 200;
    }
  });

  return { nodes, edges };
};

export const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const graphData = await getGraph();
        const { nodes: newNodes, edges: newEdges } =
          createNodesAndEdges(graphData);
        setNodes(newNodes);
        setEdges(newEdges);
      } catch (error) {
        console.error("Error fetching graph:", error);
      }
    };

    fetchGraph();
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#141A20] ml-16">
      <div className="relative flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // fitView
          minZoom={0.1}
          maxZoom={1.5}
          defaultEdgeOptions={{
            type: "smoothstep",
            style: { stroke: "#FF9F43", strokeWidth: 1 },
          }}
          className="bg-[#141A20]"
          nodesDraggable={true}
        >
          <Background
            id="1"
            gap={50}
            color="#404040"
            variant={BackgroundVariant.Lines}
            style={{ opacity: 0.2 }}
          />
          <Controls
            position="bottom-right"
            className="!bg-[#FFFFFF] !border-[#B7B7B7] overflow-hidden !right-4 !bottom-4 !flex !flex-row"
            showZoom={true}
            showFitView={false}
            showInteractive={false}
          />
        </ReactFlow>
        <button className="absolute bottom-4 left-4 bg-[#FF9F43] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#E68F33] transition-colors text-sm font-medium">
          <span className="text-lg leading-none">+</span>
          Add Methods
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#363636] border-b border-[#595858] text-[#808080] text-sm">
          <span>cart</span>
          <span>▸</span>
          <span>cart_routes.py</span>
          <span>▸</span>
          <span>POST /carts/{"{cart_id}"}</span>
        </div>
      </div>
    </div>
  );
};

export default FlowCanvas;
