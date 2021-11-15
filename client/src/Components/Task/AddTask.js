import classes from "./AddTask.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DisplayTask from "./displayTask";
import { IoChevronBackOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Axios from "axios";
const AddTask = (props) => {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [inputValidate, setInputValidate] = useState(true);
    var [tasks1, setTasks1] = useState([]);
    const location = useLocation();
    const path = location.pathname;
    const lastItem = path.substring(path.lastIndexOf("/") + 1);

    useEffect(() => {
        setLoading(true);
        Axios.get(
            "http://localhost:5000/task?collid=" +
                sessionStorage.getItem("collId")
        ).then((res) => {
            console.log(res.data);
            setTasks1(
                res.data.map((data) => ({
                    id: data.taskid,
                    collection: data.collid,
                    task: data.task,
                    completed: data.completed,
                }))
            );
        });

        setLoading(false);
    }, [props.refresh]);

    const updateTasks = () => {
        console.log("Update Task");
        setLoading(true);
        Axios.get(
            "http://localhost:5000/task?collid=" +
                sessionStorage.getItem("collId")
        ).then((res) => {
            setTasks1(
                res.data.map((data) => ({
                    id: data.taskid,
                    collection: data.collid,
                    task: data.task,
                    completed: data.completed,
                }))
            );
        });
        setLoading(false);
    };

    if (loading) {
        return <p>Loading..</p>;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (value.length === 0) {
            setInputValidate(false);
            console.log(inputValidate);
        } else {
            setLoading(true);
            Axios.post(
                "http://localhost:5000/task/add?collid=" +
                    sessionStorage.getItem("collId"),
                {
                    task: value,
                }
            ).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    updateTasks();
                }
            });

            setValue("");
            setLoading(false);
        }
    };

    var completeNum = 0;
    var IncompleteNum = 0;

    tasks1.forEach((task) => {
        if (task.completed === true) {
            completeNum += 1;
        } else {
            IncompleteNum += 1;
        }
    });

    return (
        <div className={classes.container}>
            <form onSubmit={submitHandler}>
                <h2>
                    <NavLink to="/collection">
                        <IoChevronBackOutline className={classes.backIcon} />
                    </NavLink>
                    {lastItem.toUpperCase()}
                </h2>

                <input
                    type="text"
                    placeholder="Add Task"
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                        setInputValidate(true);
                    }}
                />
            </form>
            {!inputValidate ? (
                <p className={classes.InputErrorMsg}>Enter Task</p>
            ) : (
                ""
            )}
            <ul className={classes.list}>
                {IncompleteNum !== 0 && <h4>InComplete - {IncompleteNum}</h4>}
                {!loading &&
                    tasks1.map((task) =>
                        task.completed === false ? (
                            <DisplayTask
                                todo={task}
                                onChangeInTask={updateTasks}
                            />
                        ) : (
                            ""
                        )
                    )}
                {completeNum !== 0 && <h4>Completd - {completeNum}</h4>}
                {!loading &&
                    tasks1.map((task) =>
                        task.completed === true ? (
                            <DisplayTask
                                todo={task}
                                onChangeInTask={updateTasks}
                            />
                        ) : (
                            ""
                        )
                    )}
                {completeNum === 0 && IncompleteNum === 0 && (
                    <p className={classes.NotificationMsg}>No Task Found</p>
                )}
            </ul>
        </div>
    );
};

export default AddTask;
