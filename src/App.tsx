import ReactFlow, { Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { ModalManagerState, RFState, useModalManager, useStore } from "./store";
import { shallow } from "zustand/shallow";
import {
  ActionControl,
  StageCreateModal,
  OptionPanel,
  SeatCreateModal,
} from "./components";
import { createStage, generateSeat } from "./shared/tool";
import _ from "lodash";
import { getNodeId } from "./shared/utils";

const nodeColor = (node: any) => {
  switch (node.type) {
    case "input":
      return "#6ede87";
    case "output":
      return "#6865A5";
    default:
      return "#ff0072";
  }
};

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  variant: state.variant,
  setVariant: state.setVariant,
  addNodes: state.addNodes,
});

const modalSelector = (state: ModalManagerState) =>
  ({
    isOpen: state.isOpen,
    type: state.type,
    onClose: state.onClose,
    onOpen: state.onOpen,
    setType: state.setType,
  } as ModalManagerState);

function App() {
  const { nodes, variant, onNodesChange, onEdgesChange, setVariant, addNodes } =
    useStore(selector, shallow);

  const { isOpen, onClose, onOpen, type, setType } = useModalManager(
    modalSelector,
    shallow
  );

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      <Controls />
      <OptionPanel setVariant={setVariant} variant={variant} />
      <ActionControl setType={setType} onOpen={onOpen} />
      <StageCreateModal
        isOpen={isOpen && type === "stage"}
        onCancel={onClose}
        onOk={(values) => {
          const nodeLast = _.last(nodes);
          const lastId = getNodeId(nodeLast?.id || "1");
          const nextId = `${+lastId + 1}`;
          const newStage = createStage({
            id: nextId,
            style: { width: values.width, height: values.height },
            data: {
              label: values.label,
            },
          });
          addNodes([newStage]);
        }}
      />
      <SeatCreateModal
        isOpen={isOpen && type === "seat"}
        onCancel={onClose}
        onOk={(values) => {
          const nodeLast = _.last(nodes);
          const lastId = getNodeId(nodeLast?.id || "1");
          const nextId = `${+lastId + 1}`;
          const newStage = createStage({
            id: nextId,
            style: { width: values.width, height: values.height },
            data: {
              label: values.label,
            },
          });
          const groupSeat = generateSeat({
            id: nextId,
            each: values.countInRow,
            h: values.seatH,
            w: values.seatW,
            parentH: values.width,
            parentW: values.width,
          });
          addNodes([newStage, ...groupSeat]);
        }}
      />
    </ReactFlow>
  );
}

export default App;
