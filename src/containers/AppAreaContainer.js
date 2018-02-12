import React, { Component } from "react";

import BookmarkContainer from "./BookmarkContainer";
import TodoApp from "../Components/To-Do";
import Pomodoro from "../Components/Pomodoro";
import Shelf from "../Components/Shelf";
import AppButtons from "../Components/AppButtons";
import AppViewer from "./AppViewer";
import DayInfoContainer from "./DayInfoContainer";
import SetUserName from "../Components/SetUserName";

//import app icons
import todoIcon from "../assets/icons/todo.png";
import pomodoroIcon from "../assets/icons/pomodoro.png";
import shelfIcon from "../assets/icons/shelf.png";
import bookmarkIcon from "../assets/icons/bookmark.png";

import "../styles/AppArea.css";


const listOfApps = [
    {
        app: "todo",
        title: "ToDo",
        icon: todoIcon,
        color: "#673AB7",
        component: <TodoApp/>
    },
    {
        app: "pomodoro",
        title: "Pomodoro",
        icon: pomodoroIcon,
        color: "#9C27B0",
        component: <Pomodoro/>
    },
    {
        app: "shelf",
        title: "Shelf",
        icon: shelfIcon,
        color: "#009688",
        component: <Shelf/>
    },
    {
        app: "bookmark",
        title: "Bookmark",
        icon: bookmarkIcon,
        color: "#f2f2f2",
        component: <BookmarkContainer/>
    }
];

class AppAreaContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appInView: false,
            currentApp: "",
            name: "",
            isNameSaved: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick = param => event => {
        this.setState({
            appInView: this.state.currentApp === param ? !this.state.appInView : true,
            currentApp: param
        })
    }

    handleChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem('name', JSON.stringify(this.state.name));
        this.setState({
            isNameSaved: true
        })
    }

    render() {
        if (localStorage.getItem('name') == null) {
            return <SetUserName change={this.handleChange} submit={this.handleSubmit} name={this.state.name}/>
        }
        else return(
            <div className="appArea">
                <DayInfoContainer showHide={this.state.appInView ? "dayInfo poof" : "dayInfo"} />
                <AppViewer app={this.state.currentApp} shouldView={this.state.appInView} />
                <AppButtons listOfApps={listOfApps} handleClick={this.handleClick}/>
            </div>
        );
    }
}

export default AppAreaContainer;