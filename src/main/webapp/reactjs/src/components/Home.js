import React from "react";
import {Container,Jumbotron} from "react-bootstrap";
import {Link} from "react-router-dom";


export default class Home extends React.Component{
    render(){
        return(
            <Jumbotron className="bg-dark text-white">
                <Container>
                    <h1 align="center">Welcome</h1>
                    <p align="center">
                        Contact details of teachers
                    </p>
                </Container>
            </Jumbotron>
        )
    }
}
