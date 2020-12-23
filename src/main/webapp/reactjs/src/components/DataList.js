import React from "react";
import {Card, Table, Button,ButtonGroup} from "react-bootstrap";
import  axios from 'axios';
import {Link} from "react-router-dom";


export default class DataList extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            teachers: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/teachers")
            .then(response => response.data)
            .then((data) => {
                this.setState({teachers: data})
            });
    }

    deleteData = (teacherID) => {
        axios.delete("http://localhost:8080/teachers/"+teacherID)
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
           <Card className={"border border-dark bg-dark text-white"}>
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
           </Card>
        )
    }
}
