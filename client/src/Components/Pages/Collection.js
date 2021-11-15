import NavigationBar from "../Layout/NavigationBar";
import { useState } from "react";
import AddCollection from "../Collection/addCollection";
import React from "react";
import AddTask from "../Task/AddTask";
import DisplayCollection from "../Collection/DisplayCollection";
import { useLocation } from "react-router";
import Axios from "axios";

const Collection = () => {
    const [addCollectionIsShown, setaddCollectionIsShown] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [collections, setCollections] = useState([]);
    var [lastItem, setLastItem] = useState("");
    const [refresh, doRefresh] = useState(0);
    const hideAddCollection = () => {
        setaddCollectionIsShown(false);
    };
    const location = useLocation();
    const path = location.pathname;

    lastItem = path.substring(path.lastIndexOf("/") + 1);
    const ShowAddCollection = () => {
        setaddCollectionIsShown(true);
        setLastItem(path.substring(path.lastIndexOf("/") + 1));
    };

    const changePage = () => {
        Axios.get(
            "http://localhost:5000/collection?userid=" +
                sessionStorage.getItem("userid")
        ).then((res) => {
            setCollections(res.data.data);
        });
    };

    return (
        <React.Fragment>
            {addCollectionIsShown && (
                <AddCollection
                    onClose={hideAddCollection}
                    closeDisplay={changePage}
                />
            )}

            <NavigationBar
                onShowAddCollection={ShowAddCollection}
                collection={collections}
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
            />
            {lastItem === "collection" ? (
                <DisplayCollection
                    searchTermChange={searchTerm}
                    collection={collections}
                />
            ) : (
                <AddTask refresh={() => doRefresh((prev) => prev + 1)} />
            )}
        </React.Fragment>
    );
};

export default Collection;
