import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

export default function RemoveProduct(props: any) {
  const { staticModal, setStaticModal, cart, confirmDelete } = props;

  const toggleOpen = () => setStaticModal(!staticModal);

  return (
    <>
      <MDBModal
        staticBackdrop
        tabIndex="-1"
        open={staticModal}
        setOpen={setStaticModal}
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Cảnh báo</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              Bạn có muốn xóa sản phẩm <strong>{cart.product.name}?</strong>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>
                Hủy
              </MDBBtn>
              <MDBBtn onClick={confirmDelete}>Xóa</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
