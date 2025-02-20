
import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { GraphNode } from '@/types/graph';
import { getGraph } from '@/services/api';

const createNodesAndEdges = (data: GraphNode[], parentX = 0, parentY = 0, level = 0): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let currentY = parentY;

  data.forEach((node, index) => {
    const nodeId = `${level}-${index}`;
    const x = parentX + 300;
    const fileName = node.function.split(':')[0].split('/').pop() || '';
    const functionName = node.function.split(':')[1] || '';
    
    nodes.push({
      id: nodeId,
      position: { x, y: currentY },
      data: { 
        label: (
          <div className="w-full">
            <div className="flex items-center justify-between bg-[#282828] px-3 py-2 border-b border-[#404040]">
              <span className="text-[13px] text-white font-medium">{fileName}</span>
              <img src="copy.svg" className="w-4 h-4 cursor-pointer opacity-60 hover:opacity-100" alt="Copy" />
            </div>
            <div className="p-4">
              <div className="text-[13px] text-white font-medium">{functionName}</div>
              {node.params.length > 0 && (
                <div className="mt-3">
                  <div className="text-[#FFAD62] text-[12px] font-medium">"DependentLibs": [{node.params.map(p => p.type).filter(Boolean).join(', ')}]</div>
                  <div className="text-[#FFAD62] text-[12px] mt-1 font-medium">"Params": [{node.params.map(p => `"${p.identifier}"`).join(', ')}]</div>
                  {node.response_object && (
                    <div className="text-[#FFAD62] text-[12px] mt-1 font-medium">"ResponseObject": "{node.response_object}"</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      },
      type: 'default',
      style: {
        background: '#1E1E1E',
        border: '1px solid #FF9F43',
        borderRadius: '4px',
        padding: 0,
        width: 280,
        fontSize: '13px',
        color: '#FFAD62',
      },
    });

    if (level > 0) {
      edges.push({
        id: `e-${nodeId}`,
        source: `${level - 1}-0`,
        target: nodeId,
        type: 'smoothstep',
        style: { stroke: '#FF9F43', strokeWidth: 1.5 },
        animated: true,
      });
    }

    if (node.children.length > 0) {
      const childElements = createNodesAndEdges(node.children, x, currentY, level + 1);
      nodes.push(...childElements.nodes);
      edges.push(...childElements.edges);
    }

    currentY += 250;
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
        const { nodes: newNodes, edges: newEdges } = createNodesAndEdges(graphData);
        setNodes(newNodes);
        setEdges(newEdges);
      } catch (error) {
        console.error('Error fetching graph:', error);
      }
    };

    fetchGraph();
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#141A20]">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#1E1E1E] border-b border-[#404040] text-[#808080] text-sm">
        <span>cart</span>
        <span>▸</span>
        <span>cart_routes.py</span>
        <span>▸</span>
        <span>POST /carts/{"{carts_id}"}</span>
      </div>
      <div className="relative flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
          }}
        >
          <Background color="#333" gap={16} />
          <Controls 
            className="!bg-[#1E1E1E] !border-[#404040] !rounded-md overflow-hidden"
            style={{
              backgroundColor: '#1E1E1E',
              borderColor: '#404040',
            }}
          />
          <MiniMap 
            nodeColor="#FF9F43"
            maskColor="rgba(20, 26, 32, 0.7)"
            className="!bg-[#1E1E1E] !border-[#404040]"
          />
        </ReactFlow>
        <button className="absolute bottom-4 left-4 bg-[#FF9F43] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#F08F33] transition-colors">
          <span className="text-lg">+</span>
          Add Methods
        </button>
      </div>
    </div>
  );
};
