import React, { Component } from "react";

//import all the app components
import BookmarkContainer from "./BookmarkContainer";
import TodoAppContainer from "./TodoAppContainer";
import PomodoroContainer from "./PomodoroContainer";
import ShelfContainer from "./ShelfContainer";
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

// Object that contain info about all the apps. To add a new app, import necessary components, and add it here following the existing structure.
const listOfApps = [
    {
        app: "todo",
        title: "ToDo",
        icon: todoIcon,
        color: "#673AB7",
        component: <TodoAppContainer/>
    },
    {
        app: "pomodoro",
        title: "Pomodoro",
        icon: pomodoroIcon,
        color: "#9C27B0",
        component: <PomodoroContainer/>
    },
    {
        app: "shelf",
        title: "Shelf",
        icon: shelfIcon,
        color: "#009688",
        component: <ShelfContainer/>
    },
    {
        app: "bookmark",
        title: "Bookmark",
        icon: bookmarkIcon,
        color: "#388AA8",
        component: <BookmarkContainer/>
    }
];

//Area for app window, decides to view/switch/close apps
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

    //Makes decisions of which app to view or, when to close current app
    handleClick = param => event => {
        this.setState({
            appInView: this.state.currentApp === param ? !this.state.appInView : true,
            currentApp: param
        }, () => {
            let activeLi = document.querySelector("li.activeApp");
            if (activeLi) {activeLi.classList.remove("activeApp")};
            document.getElementById(this.state.currentApp.app).classList.add("activeApp");
            if (!this.state.appInView && activeLi) {
                activeLi.classList.remove("activeApp")
            }
        });
    }

    //Input handler for first time name prompt
    handleChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    //Submit handler for first time name prompt
    handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem('name', JSON.stringify(this.state.name));
        this.setState({
            isNameSaved: true
        })
    }

    render() {
        if (localStorage.getItem('name') == null) {
            //Asks for users name if it doesn't exist in localstorage
            return <SetUserName change={this.handleChange} submit={this.handleSubmit} name={this.state.name}/>
        }
        else return(
            <div className="appArea">
                <DayInfoContainer showHide={this.state.appInView ? "dayInfo poof" : "dayInfo"} />
                <AppViewer app={this.state.currentApp} shouldView={this.state.appInView} />
                <AppButtons listOfApps={listOfApps} handleClick={this.handleClick} activeApp={this.state.currentApp}/>
            </div>
        );
    }
}

export default AppAreaContainer;