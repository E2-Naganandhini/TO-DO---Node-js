import { useState } from "react";
import Axios from "axios";
import classes from "./addCollectionForm.module.css";
const AddCollectionForm = (props) => {
    const [collectionInput, setCollectionInput] = useState([]);
    const [collectionIsValid, setCollectionIsValid] = useState(true);
    const confirmHandler = (event) => {
        event.preventDefault();
        if (collectionInput.length === 0) {
            setCollectionIsValid(false);
        } else {
            Axios.post(
                "http://localhost:5000/collection/add?userid=" +
                    sessionStorage.getItem("userid"),
                {
                    collection: collectionInput,
                }
            )
                .then((res) => {
                    if (res.status === 200) {
                        props.closeDisplay();
                        props.onCancel();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            setCollectionInput("");
        }
    };
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <label htmlFor="name">Add Collection</label>
            <input
                type="text"
                placeholder="Add Collection"
                value={collectionInput}
                onChange={(event) => {
                    setCollectionInput(event.target.value);
                    setCollectionIsValid(true);
                }}
            />
            {!collectionIsValid && (
                <p className={classes.invalid}>Please enter a valid Name</p>
            )}
            <div>
                <button onClick={confirmHandler}>Add</button>
                <button onClick={props.onCancel}>Close</button>
            </div>
        </form>
    );
};
export default AddCollectionForm;
