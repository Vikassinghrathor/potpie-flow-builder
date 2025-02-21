import React, { useEffect, useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  MarkerType,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Copy } from "lucide-react";
import { GraphNode } from "@/types/graph";
import { getGraph } from "@/services/api";
import nodeicon from "../../assets/nodeicon.png";

const EDGE_COLOR = "#7C7C7C";

const createNodesAndEdges = (
  data: GraphNode[],
  parentX = 0,
  parentY = 0,
  level = 0,
  viewportWidth: number
): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let currentY = parentY;

  // Adjust horizontal spacing based on viewport width
  const horizontalSpacing = Math.max(350, viewportWidth * 0.25);

  data.forEach((node, index) => {
    const nodeId = `${level}-${index}`;
    const x = parentX + horizontalSpacing;
    const fileName = node.function.split(":")[0].split("/").pop() || "";
    const functionName = node.function.split(":")[1] || "";

    nodes.push({
      id: nodeId,
      position: { x, y: currentY },
      data: {
        label: (
          <div className="w-full">
            <div className="flex items-center justify-between bg-[#282828] px-4 py-3 border-b border-[#404040]">
              <span className="text-[14px] text-white font-medium text-left">
                {fileName}
              </span>
              <img
                src={nodeicon}
                alt="Node Icon"
                className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white transition-colors"
              />
            </div>
            <div className="p-5">
              <div className="text-[14px] text-white font-medium text-left">
                {functionName}
              </div>
              {node.params && (
                <div className="mt-4 space-y-2 text-left">
                  {node.params.some((p) => p.type) && (
                    <div>
                      <span className="text-[#FFAD62] text-[13px] font-medium">
                        "DependentLibs":
                      </span>
                      <span className="text-white text-[13px]">
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
                    <span className="text-[#FFAD62] text-[13px] font-medium">
                      "Params":
                    </span>
                    <span className="text-white text-[13px]">
                      {" "}
                      [{node.params.map((p) => `"${p.identifier}"`).join(", ")}]
                    </span>
                  </div>
                  {node.response_object && (
                    <div>
                      <span className="text-[#FFAD62] text-[13px] font-medium">
                        "ResponseObject":
                      </span>
                      <span className="text-white text-[13px]">
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
        border: "2px solid #FF9F43",
        borderRadius: "6px",
        padding: 0,
        width: Math.min(320, viewportWidth * 0.2),
        fontSize: "14px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      className: "hover:shadow-xl transition-shadow duration-300",
    });

    if (level > 0) {
      edges.push({
        id: `e-${nodeId}`,
        source: `${level - 1}-0`,
        target: nodeId,
        type: "step",
        style: {
          stroke: EDGE_COLOR,
          strokeWidth: 2.5,
        },
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: EDGE_COLOR,
          width: 15,
          height: 15,
        },
      });
    }

    if (node.children?.length > 0) {
      const childElements = createNodesAndEdges(
        node.children,
        x,
        currentY,
        level + 1,
        viewportWidth
      );
      nodes.push(...childElements.nodes);
      edges.push(...childElements.edges);
      currentY += Math.max(250, viewportWidth * 0.15) * node.children.length;
    } else {
      currentY += Math.max(250, viewportWidth * 0.15);
    }
  });

  return { nodes, edges };
};

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  const handleResize = useCallback(() => {
    const viewportWidth = window.innerWidth;
    fitView({
      duration: 200,
      padding: 0.3,
      minZoom: 0.8,
      maxZoom: 0.8,
    });
  }, [fitView]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    const initializeFlow = async () => {
      try {
        const graphData = await getGraph();
        const viewportWidth = window.innerWidth;
        const { nodes: newNodes, edges: newEdges } = createNodesAndEdges(
          graphData,
          0,
          0,
          0,
          viewportWidth
        );

        setNodes(newNodes);
        setEdges(newEdges);

        // Ensure proper initial layout
        setTimeout(() => {
          fitView({
            duration: 0,
            padding: 0.3,
            minZoom: 0.8,
            maxZoom: 0.8,
          });
        }, 100);
      } catch (error) {
        console.error("Error initializing flow:", error);
      }
    };

    initializeFlow();
  }, [fitView]);

  const edgeOptions = {
    type: "step",
    style: {
      stroke: EDGE_COLOR,
      strokeWidth: 2.5,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: EDGE_COLOR,
      width: 15,
      height: 15,
    },
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      defaultEdgeOptions={edgeOptions}
      minZoom={0.4}
      maxZoom={1.5}
      className="bg-[#141A20]"
      nodesDraggable={true}
      fitView
      fitViewOptions={{
        padding: 0.3,
        minZoom: 0.8,
        maxZoom: 0.8,
      }}
      connectionLineStyle={{
        stroke: EDGE_COLOR,
        strokeWidth: 2.5,
      }}
    >
      <Background
        id="1"
        gap={60}
        color="#404040"
        variant={BackgroundVariant.Lines}
        style={{ opacity: 0.2 }}
      />
      <Controls
        position="bottom-right"
        className="!bg-[#FFFFFF] !border-[#B7B7B7] overflow-hidden !right-4 !bottom-4 !flex !flex-row !p-2"
        showZoom={true}
        showFitView={false}
        showInteractive={false}
      />
    </ReactFlow>
  );
};

export const FlowCanvas = () => {
  return (
    <div className="flex flex-col h-full bg-[#141A20] ml-16">
      <div className="flex-1 relative">
        {/* <div className="absolute inset-0"> */}
          <ReactFlowProvider>
            <Flow />
          </ReactFlowProvider>
        {/* </div> */}
        <button className="absolute bottom-4 left-4 bg-[#FF9F43] text-white px-6 py-3 rounded-md flex items-center gap-2 hover:bg-[#E68F33] transition-colors text-sm font-medium z-10">
          <span className="text-lg leading-none">+</span>
          Add Methods
        </button>
        <div className="flex items-center gap-2 px-4 py-3 bg-[#363636] border-b border-[#595858] text-[#BDBDBD] text-sm">
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
