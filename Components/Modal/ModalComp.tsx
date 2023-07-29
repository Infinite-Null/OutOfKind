import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

export default function ModalComp({visible, setVisible, message , Good=false}:any) {


  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        css={{
          margin:"10px"
        }}
      >
        <Modal.Header>
       <Text css={{
        fontSize:"$5xl",
        color:(Good==false)?"red":"green",
       }}>{(Good==false)?"!":"^_^"}</Text>
        </Modal.Header>
       <Text b>{message}</Text>
        <Modal.Footer>
          <Button auto flat color={(Good==false)?"error":"success"} onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}