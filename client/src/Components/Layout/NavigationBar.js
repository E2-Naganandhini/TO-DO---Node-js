import { NavLink } from "react-router-dom";
import classes from "./NavigationBar.module.css";
import { FaAlignJustify } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { MdAddCircleOutline } from "react-icons/md";
import Axios from "axios";
const NavigationBar = (props) => {
    const [sideBar, setsideBar] = useState(false);
    var [collection, setCollection] = useState([]);
    if (props.collection) {
        if (props.collection.length !== 0) {
            console.log(props.collection);
            collection = props.collection;
        }
    }
    const [search, setSearch] = useState(false);
    useEffect(() => {
        Axios.get(
            "http://localhost:5000/collection?userid=" +
                sessionStorage.getItem("userid")
        ).then((res) => {
            if (res.data.status === 200) {
                setCollection(res.data.data);
            } else {
                setCollection([]);
            }
        });
    }, []);

    const unSetSession = (e) => {
        e.preventDefault();
        sessionStorage.removeItem("userid");
        sessionStorage.removeItem("collid");
        window.location.href = "/login";
    };

    const sideControlClasses = sideBar
        ? `${classes.nav_menu} ${classes.active}`
        : classes.nav_menu;

    const menuIconClick = () => {
        sideBar ? setsideBar(false) : setsideBar(true);
    };
    return (
        <React.Fragment>
            <div>
                <header className={classes.header}>
                    <div className={classes.sidetitle}>
                        <Link to="#" className={classes.nav_side_bars}>
                            <FaAlignJustify
                                className={classes.collIcon}
                                onClick={menuIconClick}
                            />
                        </Link>
                        <div className={classes.title}>TO DO</div>
                    </div>
                    <div className={classes.secondsidetitle}>
                        <MdAddCircleOutline
                            className={classes.addCollIcon}
                            onClick={props.onShowAddCollection}
                            title="Add Collection"
                        />
                        <nav className={classes.nav}>
                            <ul>
                                <li>
                                    <BiSearch
                                        className={classes.searchIcon}
                                        onClick={() => {
                                            setSearch(!search);
                                        }}
                                    />
                                </li>
                                <li>
                                    {search && (
                                        <input
                                            placeholder="Search.."
                                            type="text"
                                            onChange={props.onChange}
                                        />
                                    )}
                                </li>
                                <li className={classes.collTitle}>
                                    <NavLink to="/collection">
                                        Collection
                                    </NavLink>
                                </li>
                                <li className={classes.collTitle}>
                                    <NavLink to="/login" onClick={unSetSession}>
                                        Logout
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>

                <nav className={sideControlClasses}>
                    <ul
                        className={classes.nav_menu_items}
                        onClick={menuIconClick}
                    >
                        <li>
                            <Link to="#" className={classes.menu_bars}>
                                <AiOutlineClose />
                            </Link>
                        </li>
                        <li className={classes.nav_text}>
                            <Link to="/collection">
                                <span>Collection</span>
                            </Link>
                        </li>
                        <ul className={classes.nav_sub_menu_items}>
                            {collection.map((task) => (
                                <li
                                    key={task.collection}
                                    className={classes.nav_text}
                                    onClick={() => {
                                        sessionStorage.removeItem("collId");
                                        sessionStorage.setItem(
                                            "collId",
                                            task.collid
                                        );

                                        sessionStorage.setItem("apiFlag", true);
                                    }}
                                >
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
                        </ul>
                    </ul>
                </nav>
            </div>
            <div className={classes.miniAddCollIcon}>
                <MdAddCircleOutline
                    className={classes.addCollIcon}
                    onClick={props.onShowAddCollection}
                />
            </div>
        </React.Fragment>
    );
};
export default NavigationBar;
