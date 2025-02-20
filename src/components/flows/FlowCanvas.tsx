
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
    
    nodes.push({
      id: nodeId,
      position: { x, y: currentY },
      data: { 
        label: (
          <div className="p-4">
            <div className="font-medium text-sm">{node.function.split(':')[1]}</div>
            {node.params.length > 0 && (
              <div className="text-xs mt-2">
                <span className="text-[#FFAD62]">Params:</span>
                {node.params.map(param => (
                  <div key={param.identifier} className="ml-2">
                    {param.identifier}: {param.type || 'any'}
                  </div>
                ))}
              </div>
            )}
            {node.response_object && (
              <div className="text-xs mt-2">
                <span className="text-[#FFAD62]">Response:</span> {node.response_object}
              </div>
            )}
          </div>
        )
      },
      type: 'default',
      style: {
        background: '#1E1E1E',
        color: '#fff',
        border: '1px solid #FF9F43',
        borderRadius: '4px',
        width: 250,
      },
    });

    if (level > 0) {
      edges.push({
        id: `e-${nodeId}`,
        source: `${level - 1}-0`,
        target: nodeId,
        type: 'smoothstep',
        style: { stroke: '#FF9F43' },
      });
    }

    if (node.children.length > 0) {
      const childElements = createNodesAndEdges(node.children, x, currentY, level + 1);
      nodes.push(...childElements.nodes);
      edges.push(...childElements.edges);
    }

    currentY += 200;
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
    <div className="h-[800px] bg-[#141A20]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background color="#333" gap={16} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
