import React from "react";

import {Navbar, Nav, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class NavigationBar extends React.Component{
    render() {
        return (
            <Navbar bg="dark" expand="lg" >
                <Link to={""} className={"nav-link text-white"}>Contact details of teachers</Link>
                <Nav className="mr-auto">
                    <Link to={"/register"} className={"nav-link text-white"}>Register</Link>
                    <Link to={"/login"} className={"nav-link text-white"}>Login</Link>
                    <Link to={"/list"} className={"nav-link text-white"}>Data list</Link>
                    <Link to={"/add"} className={"nav-link text-white"}>Add data</Link>
                </Nav>
            </Navbar>
        );
    }
}
