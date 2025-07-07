
import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  BuiltInNode,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,Handle, Position, NodeResizer,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Home, Users, Utensils, Bed, Bath, Coffee } from 'lucide-react';
import { House } from '../classes/house';
import { Room } from '../classes/room';

interface Environment {
  id: string;
  name: string;
  image360: string;
}

//============================= for close connection]

//==============================

const connectionLineStyle = {
  stroke: '#b1b1b7',
  strokeWidth: 3 // Define a espessura da linha
};

export type NodeType = Room;


interface VirtualTourBuilderProps {
  environments: Room[];
}

const getIconForRoom = (roomName: string) => {
  const name = roomName.toLowerCase();
  if (name.includes('entrada') || name.includes('hall')) return Home;
  if (name.includes('sala') || name.includes('living')) return Users;
  if (name.includes('jantar') || name.includes('cozinha')) return Utensils;
  if (name.includes('quarto') || name.includes('suíte')) return Bed;
  if (name.includes('banheiro') || name.includes('lavabo')) return Bath;
  if (name.includes('varanda') || name.includes('área')) return Coffee;
  return Home;
};

const createNodeFromEnvironment = (env: Room, index: number) => {  //node creation !!
  const Icon = getIconForRoom(env.getName());

  return {
    id: String(env.getId()),
    type: 'default',
    position: { 
      x: 150 + (index % 3) * 200, 
      y: 100 + Math.floor(index / 3) * 150 
    },
    data: { 
      label: (
        <div className="flex flex-col items-center space-y-2 p-2">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-center">{env.getName() || `Ambiente ${index + 1}`}</span>
        </div>
      )
    },
    style: {
      background: 'white',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      padding: '8px',
      minWidth: '120px',
      minHeight: '100px',
    }
  };
};

const VirtualTourBuilder = ({ environments }: VirtualTourBuilderProps) => { //loop and creation all environment
  const initialNodes: Node[] = environments.map((env, index) => 
    createNodeFromEnvironment(env, index)
  );

  
  const onConnect = useCallback((connection: Connection) => {
  setEdges((eds) => addEdge(connection, eds));
}, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);



  // Update nodes when environments change
  React.useEffect(() => {
    const updatedNodes = environments.map((env, index) => 
      createNodeFromEnvironment(env, index)
    );
    setNodes(updatedNodes);
  }, [environments, setNodes]);

  if (environments.length === 0) {
    return (
      <div className="h-96 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-medium text-slate-700 mb-2">
            Nenhum ambiente configurado
          </h3>
          <p className="text-sm text-slate-500">
            Adicione ambientes na aba "Ambientes 360°" para configurar o tour virtual
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-96 border border-slate-200 rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
        className="bg-slate-50"
      >
        <Controls className="bg-white shadow-md" />
        <Background color="#e2e8f0" gap={20} />
        <MiniMap 
          className="bg-white border w-15% border-slate-200"
          nodeColor="#00a2b9"
          maskColor="rgba(255, 255, 255, 0.8)"
        />
      </ReactFlow>
      
      <div className="absolute bottom-4 left-4 border-gray-200 bg-white p-3 rounded-lg shadow-md border text-xs text-slate-600">
        <p className="font-medium mb-1">💡 Como usar:</p>
        <p>• Arraste os ambientes para reorganizar</p>
        <p>• Conecte os pontos para criar o fluxo do tour</p>
      </div>
    </div>
  );
};

export default VirtualTourBuilder;
