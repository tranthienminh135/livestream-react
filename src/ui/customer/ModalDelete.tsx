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
import { deleteCustomer } from "../../service/customer-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ModalDelete({
  setBasicModal,
  basicModal,
  customer,
  onDeleteSuccess,
}: any) {
  const toggleOpen = () => setBasicModal(!basicModal);

  const handleDelete = () => {
    deleteCustomer(customer).then((res) => {
      toast("Xóa thành công!!");
      onDeleteSuccess();
    });
  };

  return (
    <>
      <MDBModal
        staticBackdrop
        open={basicModal}
        setOpen={setBasicModal}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>WARNING!!</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              Do you want delete{" "}
              <span className="fw-bold">{customer.name}</span>?
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleDelete}>Confirm</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
