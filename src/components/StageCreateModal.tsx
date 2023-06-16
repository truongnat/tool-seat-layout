import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { useEffect, useMemo, useRef } from "react";
import { createSanboxPreview, createSvg } from "../hooks/utils/svg";
import { SanboxPreview } from "../store";

export type StageForm = {
  type: SanboxPreview;
  width: number;
  height: number;
  label: string;
};

type StageCreateModalProps = {
  isOpen: boolean;
  onOk?: (values: StageForm) => void;
  onCancel?: () => void;
};

const { Text } = Typography;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const initial = {
  type: "square",
  width: 300,
  height: 300,
  label: "Sân khấu",
};

export default function StageCreateModal({
  isOpen,
  onCancel,
  onOk,
}: StageCreateModalProps) {
  const [form] = Form.useForm<StageForm>();

  const preview = Form.useWatch([], form);

  const onFinish = (values: StageForm) => {
    onOk?.(values);
  };

  const SVGWrapperRefElement = useRef<any>(null);
  const SVGContainer = useMemo(() => createSvg(), []);

  useEffect(() => {
    if (
      SVGWrapperRefElement &&
      SVGWrapperRefElement.current &&
      SVGWrapperRefElement.current.children.length < 1 &&
      isOpen
    ) {
      SVGContainer.addTo(SVGWrapperRefElement.current);
    }
    return () => {
      SVGContainer.remove();
    };
  }, [SVGWrapperRefElement, SVGContainer, isOpen]);

  useEffect(() => {
    createSanboxPreview(SVGContainer)(preview?.type);
  }, [SVGContainer, preview?.type]);

  return (
    <Modal
      title={"Sân khấu"}
      open={isOpen}
      onOk={() => {
        form.submit();
        onCancel?.();
      }}
      onCancel={() => {
        form.resetFields();
        onCancel?.();
      }}
      width={"80%"}
    >
      <Row>
        <Col span={12}>
          <Text strong>Cấu hình sân khấu</Text>
          <Divider />
          <Form
            {...layout}
            form={form}
            name="stage-form"
            onFinish={onFinish}
            layout="vertical"
            className="mt-4"
            initialValues={initial}
          >
            <Form.Item
              name="label"
              label="Tên sân khấu"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="width"
              label="Chiều dài"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="height"
              label="Chiều cao"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="type"
              label="Loại hình sân khấu"
              rules={[{ required: true }]}
            >
              <Select placeholder="Lựa chọn loại hình sân khấu" allowClear>
                <Option value="square">Hình Vuông</Option>
                <Option value="circle">Hình tròn</Option>
                <Option value="triangle">Hình tam giác</Option>
                <Option value="trapezoid">Hình thang</Option>
                <Option value="semicircle">Hình bán nguyệt</Option>
              </Select>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Text strong>Preview</Text>
          <Divider />
          <div ref={SVGWrapperRefElement} />
        </Col>
      </Row>
    </Modal>
  );
}
