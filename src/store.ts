import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  BackgroundVariant,
} from "reactflow";

import initialNodes from "./nodes";
import initialEdges from "./edges";

export type SanboxPreview =
  | "square"
  | "circle"
  | "triangle"
  | "trapezoid"
  | "semicircle";

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  variant: BackgroundVariant | undefined;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setVariant: (variant: BackgroundVariant | undefined) => void;
  addNodes: (nodes: Node[]) => void;
};

export type ModalManagerState = {
  type: "seat" | "stage";
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setType: (type: "seat" | "stage") => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  variant: undefined,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  addNodes: (nodes: Node[]) => {
    set({
      nodes: get().nodes.concat(nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setVariant: (variant: BackgroundVariant | undefined) => {
    set({
      variant,
    });
  },
}));

export const useModalManager = create<ModalManagerState>((set) => ({
  isOpen: false,
  type: "seat",
  onClose: () => {
    set({ isOpen: false });
  },
  onOpen: () => {
    set({ isOpen: true });
  },
  setType: (type) => {
    set({ type });
  },
}));
