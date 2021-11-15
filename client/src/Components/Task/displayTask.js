import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { ImRadioUnchecked } from "react-icons/im";
import classes from "./displayTask.module.css";
import Modal from "../UI/Modals";
import { useState } from "react";
import Axios from "axios";
function DisplayTask(props) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const toggleStatusChange = (todo) => {
        Axios.post("http://localhost:5000/task/update?taskid=" + todo.id, {
            completed: !todo.completed,
        })
            .then((res) => {
                if (res.status === 200) {
                    props.onChangeInTask();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const listControlClasses = props.todo.completed
        ? `${classes.listItem} ${classes.line_through}`
        : classes.listItem;

    return (
        <React.Fragment>
            {openDeleteModal && (
                <Modal
                    onClose={() => {
                        setOpenDeleteModal(false);
                    }}
                >
                    <div className={classes.delModal}>
                        <h2>Delete</h2>
                        <p className={classes.delMessage}>
                            Are you sure you want to delete?
                        </p>
                        <button
                            onClick={() => {
                                setOpenDeleteModal(false);
                            }}
                            className={classes.delButton}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                Axios.post(
                                    "http://localhost:5000/task/delete?taskid=" +
                                        props.todo.id
                                )
                                    .then((res) => {
                                        if (res.status === 200) {
                                            props.onChangeInTask();
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                                setOpenDeleteModal(false);
                            }}
                            className={classes.delButton}
                        >
                            Delete
                        </button>
                    </div>
                </Modal>
            )}
            <div className={listControlClasses}>
                {props.todo.completed === true ? (
                    <AiFillCheckCircle
                        className={classes.checkIcon}
                        onClick={() => {
                            toggleStatusChange(props.todo);
                        }}
                    />
                ) : (
                    <ImRadioUnchecked
                        className={classes.checkIcon}
                        onClick={() => {
                            toggleStatusChange(props.todo);
                        }}
                    />
                )}
                <span className={classes.listTodo}>{props.todo.task}</span>
                <MdDelete
                    className={classes.deleteIcon}
                    onClick={() => {
                        setOpenDeleteModal(true);
                    }}
                />
            </div>
        </React.Fragment>
    );
}

export default DisplayTask;
