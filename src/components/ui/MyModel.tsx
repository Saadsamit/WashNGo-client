import { Modal } from "antd";
import Title from "antd/es/typography/Title";
import { ReactNode } from "react";

type TMyModel = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  title: string;
};

const MyModel = ({ modal, setModal, children, title }: TMyModel) => {
  return (
    <Modal
      forceRender={false}
      title={
        <Title level={3} className="text-center capitalize">
          {title}
        </Title>
      }
      centered
      open={modal}
      footer=""
      onCancel={() => setModal(false)}
    >
      {children}
    </Modal>
  );
};

export default MyModel;
