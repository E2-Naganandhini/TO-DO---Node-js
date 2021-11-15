import React from "react";
import Modal from "../UI/Modals";
import AddCollectionForm from "./addCollectionForm";

const AddCollection = (props) => {
    const submitHandler = () => {
        props.onClose();
    };
    const cartModal = (
        <React.Fragment>
            <AddCollectionForm
                onConfirm={submitHandler}
                onCancel={props.onClose}
                closeDisplay={props.closeDisplay}
            />
        </React.Fragment>
    );
    return <Modal onClose={props.onClose}>{cartModal}</Modal>;
};

export default AddCollection;
