import { useEffect, useState } from "react";
import classes from "./DisplayCollection.module.css";
import { Link } from "react-router-dom";
import Axios from "axios";

const DisplayCollection = (props) => {
    var [collections, setCollections] = useState([]);
    if (props.collection) {
        if (props.collection.length !== 0) {
            collections = props.collection;
        }
    }
    useEffect(() => {
        Axios.get(
            "http://localhost:5000/collection?userid=" +
                sessionStorage.getItem("userid")
        ).then((res) => {
            if (res.data.status === 200) {
                setCollections(res.data.data);
            } else {
                setCollections([]);
            }
        });
    }, []);
    console.log(collections);
    return (
        <div>
            <ul className={classes.collection}>
                {collections
                    .filter((task) => {
                        if (props.searchTermChange === "") {
                            return task;
                        } else if (
                            task.collection
                                .toLowerCase()
                                .includes(props.searchTermChange.toLowerCase())
                        ) {
                            return task;
                        }
                    })
                    .map((task) => (
                        <li>
                            <Link
                                to={`/collection/${task.collection}`}
                                onClick={() => {
                                    sessionStorage.removeItem("collId");
                                    sessionStorage.setItem(
                                        "collId",
                                        task.collid
                                    );
                                }}
                            >
                                {task.collection}
                            </Link>
                        </li>
                    ))}
                {collections.length === 0 && (
                    <p className={classes.NotificationMsg}>No Collection</p>
                )}
            </ul>
        </div>
    );
};

export default DisplayCollection;
