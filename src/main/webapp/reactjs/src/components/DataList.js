import React from "react";
import {Card, Table, Button,ButtonGroup} from "react-bootstrap";
import  axios from 'axios';
import {Link} from "react-router-dom";

function get_cookie ( cookie_name )
{
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
}
export default class DataList extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            teachers: [],
            init:false
        };
    }


    componentDidMount() {
        let config = {
            headers: {
                AUTHORIZATION: "Bearer " + get_cookie ( "token" )
            }
        };
        axios.get("http://localhost:8080/teachers",config)
            .then(response => response.data)
            .then((data) => {
                this.setState({teachers: data, init: true})
            }).catch((error) => {
            this.setState({init: false})
        });
    }

    deleteData = (teacherID) => {
        let config = {
            headers: {
                AUTHORIZATION: "Bearer " + document.cookie
            }
        };
        axios.delete("http://localhost:8080/teachers/"+teacherID,config)
            .then(response =>{
                    if(response.data != null){
                        this.setState({
                            teachers: this.state.teachers.filter(teacher => teacher.id !== teacherID)
                        });
                    }
                });
    };

    render(){
        return(

             this.state.init ? ( <Card className= { "border border-dark bg-dark text-white" } >
                    <Card.Header>Contact details of teachers</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Phone number</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.teachers === 0 ?
                                    <tr align="center">
                                        <td colSpan="6">No data.</td>
                                    </tr> :
                                    this.state.teachers.map((teacher) => (
                                        <tr key={teacher.id}>
                                            <td>{teacher.name}</td>
                                            <td>{teacher.email}</td>
                                            <td>{teacher.phone}</td>
                                            <td>
                                                <buttonGroup >
                                                    <Link to={"edit/"+teacher.id}><button class="button-blue">Edit</button></Link>{' '}
                                                    <button class="button-red" onClick={this.deleteData.bind(this, teacher.id)} >Delete</button>
                                                </buttonGroup>
                                            </td>
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>) : <div style={{color: "red"}}>Нет прав</div>

        )
    }
}
