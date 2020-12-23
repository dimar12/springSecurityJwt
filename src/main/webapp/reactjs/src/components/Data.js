import React from "react";
import {Card,Form,Button,Col} from "react-bootstrap";
import  axios from 'axios';

export default class Data extends React.Component{
    constructor(props){
        super(props);
        this.state = this.initialState;
        this.dataChange= this.dataChange.bind(this);
        this.SubmitData= this.SubmitData.bind(this);
        this.UpdateData= this.UpdateData.bind(this);
    }
    initialState = {
        id: '', name:'', email:'',phone:'', phoneError:''
    }

    componentDidMount(){
        const teacherID = + this.props.match.params.id;
        if(teacherID){
            this.findDataById(teacherID);
        }
    }

    findDataById = (teacherID) => {
         axios.get("http://localhost:8080/teachers/"+teacherID)
                .then(response => {
                if(response.data != null){
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        phone: response.data.phone,
                    });
                    }
                });
    }
    ResetData = () => {
        this.setState(() => this.initialState);
    }

    SubmitData(event){
    if(!this.state.phoneError){
        event.preventDefault();

        const Data = {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone
        }

        axios.post("http://localhost:8080/teachers", Data)
        .then(response => {
               if(response.data != null){
                    this.setState(this.initialState);
               }
        });
    }
    else{
    alert('The phone number must contain 10 numbers')
    }
    }

    UpdateData(event){
    if(!this.state.phoneError){
           event.preventDefault();

           const Data = {
           name: this.state.name,
           email: this.state.email,
           phone: this.state.phone
            }

            axios.put("http://localhost:8080/teachers/" + this.state.id, Data)
             .then(response => {
              if(response.data != null){
                this.setState(this.initialState);
             }
             });
          }
           else{
              alert('The phone number must contain 10 numbers')
              }
       }
       validatePhone = phone => {
         const regex = /^\d{10}$/;
         return !regex.test(phone)
            ? "The phone number must contain 10 numbers"
            : "";
       }

       onPhoneBlur = () => {
         const { phone } = this.state;
         const phoneError = this.validatePhone( phone );
         return this.setState({ phoneError });
       };
    dataChange(event){
        this.setState({[event.target.name]:event.target.value})
    }
    render(){
    const {name,email,phone,phoneError} = this.state;

    return(
    <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header> {this.state.id ? "Update contact details" : "Add contact details"}</Card.Header>
        <Card.Body>
            <Form onReset={this.ResetData} onSubmit={this.state.id ? this.UpdateData : this.SubmitData} id = "DataFormId">
              <Form.Group as={Col} controlid="formGridNeme">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" name="name" value={name} onChange={this.dataChange} placeholder="Enter name" />
              </Form.Group>
              <Form.Group  as={Col} controlid="formGridEmail">
                 <Form.Label>Email address</Form.Label>
                 <Form.Control required type="email"  name="email" value={email} onChange={this.dataChange} placeholder="Enter email" />
              </Form.Group>
              <Form.Group  as={Col} controlid="formGridPhone">
                  <Form.Label>Email phone number</Form.Label>
                  <Form.Control required type="text"  name="phone" value={phone} onChange={this.dataChange} onBlur={this.onPhoneBlur} placeholder="Enter phone number" />  {phoneError && <div style={{color: 'red', margin: 5}}>{phoneError}</div>}
              </Form.Group>
              <Button variant="success" type="submit">
                {this.state.id ? "Update" : "Submit"}
              </Button>{' '}
               <Button variant="info" type="reset">
                 Reset
               </Button>
            </Form>
        </Card.Body>
    </Card>
    );
    }
}
