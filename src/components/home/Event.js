import React, {Component, Fragment} from 'react';
import {Button, Table, Modal} from "react-bootstrap";
import ApiURL from "../../api/ApiURL";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import Form from "react-bootstrap/Form";

class Event extends Component {
    constructor() {
        super();
        this.state = {
            category: '',
            eventt: '',
            description: '',
            date: '',
            image: '',
            status: '',
            feature: '',
            editID: '',
            editEventValue: '',
            editCategory: '',
            editEvent: '',
            editDescription: '',
            editDate: '',
            editImage: '',
            editStatus: '',
            editFeature: '',
            modalShow: false,
            editModalShow: false,
            eventData: [],
            categoryData: []
        }
        this.modalOnShow = this.modalOnShow.bind(this);
        this.modalOnClose = this.modalOnClose.bind(this);
        this.editModalOnShow = this.editModalOnShow.bind(this);
        this.editModalOnClose = this.editModalOnClose.bind(this);
    }
    componentDidMount() {
        axios.get(ApiURL.getEvent)
            .then(response=>{
                this.setState({eventData:response.data});
            })
        axios.get(ApiURL.getCategory)
            .then(response=>{
                this.setState({categoryData:response.data});
            })
    }
    // Method for Control Modal
    modalOnShow(){
        this.setState({modalShow:true});
    }
    modalOnClose(){
        this.setState({modalShow:false});
    }
    editModalOnShow(){
        this.setState({editModalShow:true});
    }
    editModalOnClose(){
        this.setState({editModalShow:false});
    }
    onEdit(id,name){
        this.setState({editID:id});
        this.setState({editEventValue:name});
        this.editModalOnShow();
    }
    onDelete(id){
        axios.get(ApiURL.deleteEvent(id))
            .then(response=>{
                this.componentDidMount();
                toast.success("Successfully Deleted",{
                    position:"top-center"
                });
            })
            .catch(error=>{
                toast.error("Server is not responding",{
                    position:"top-center"
                });
            })
    }
    editCategoryOnChange=(event)=>{
        let editCategory = event.target.value;
        this.setState({editCategory:editCategory})
    }
    editEventOnChange=(event)=>{
        let editEvent = event.target.value;
        this.setState({editEvent:editEvent})
    }
    editDescriptionOnChange=(event)=>{
        let editDescription = event.target.value;
        this.setState({editDescription:editDescription})
    }
    editDateOnChange=(event)=>{
        let editDate = event.target.value;
        this.setState({editDate:editDate})
    }
    editImageOnChange=(event)=>{
        let editImage = event.target.files[0];
        this.setState({editImage:editImage})
    }
    editStatusOnChange=(event)=>{
        let editStatus = event.target.value;
        this.setState({editStatus:editStatus})
    }
    editFeatureOnChange=(event)=>{
        let editFeature = event.target.value;
        this.setState({editFeature:editFeature})
    }
    editFormSubmit=(event)=>{
        event.preventDefault();
        let editCategory = this.state.editCategory;
        let editEvent = this.state.editEvent;
        let editDescription = this.state.editDescription;
        let editDate = this.state.editDate;
        let editImage = this.state.editImage;
        let editStatus = this.state.editStatus;
        let editFeature = this.state.editFeature;
        let myFormData = new FormData();
        myFormData.append("category",editCategory);
        myFormData.append("event",editEvent);
        myFormData.append("description",editDescription);
        myFormData.append("date",editDate);
        myFormData.append("image",editImage);
        myFormData.append("status",editStatus);
        myFormData.append("featured",editFeature);

        axios.post(ApiURL.updateEvent(this.state.editID),myFormData)
            .then(response=>{
                    this.setState({editModalShow:false});
                    this.componentDidMount();
                    toast.success("Event successfully updated",{
                        position:"top-center"
                    });
            })
            .catch(error=>{
                toast.error("Server is not responding",{
                    position:"bottom-center"
                });
            })
    }
    categoryOnChange=(event)=>{
        let category = event.target.value;
        this.setState({category:category});
    }
    eventOnChange=(event)=>{
        let eventt = event.target.value;
        this.setState({eventt:eventt});
    }
    descriptionOnChange=(event)=>{
        let description = event.target.value;
        this.setState({description:description});
    }
    dateOnChange=(event)=>{
        let date = event.target.value;
        this.setState({date:date});
    }
    imageOnChange=(event)=>{
        let image = event.target.files[0];
        this.setState({image:image});
    }
    statusOnChange=(event)=>{
        let status = event.target.value;
        this.setState({status:status});
    }
    featureOnChange=(event)=>{
        let feature = event.target.value;
        this.setState({feature:feature});
    }
    onFormSubmit=(event)=>{
        event.preventDefault();
        let category = this.state.category;
        let eventt = this.state.eventt;
        let description = this.state.description;
        let date = this.state.date;
        let image = this.state.image;
        let status = this.state.status;
        let feature = this.state.feature;
        if(category && eventt && description && date && image){
            let myFormData = new FormData();
            myFormData.append("category",category);
            myFormData.append("event",eventt);
            myFormData.append("description",description);
            myFormData.append("date",date);
            myFormData.append("image",image);
            myFormData.append("status",status);
            myFormData.append("featured",feature);

            let config = {
                headers : {'content-type':'multipart/form-data'}
            }
            axios.post(ApiURL.addEvent,myFormData,config)
                .then(response=>{
                    if(response.data===1){
                        this.setState({modalShow:false});
                        this.componentDidMount();
                        toast.success("Event successfully added",{
                            position:"top-center"
                        });
                    }
                    else{
                        toast.error("There is an error",{
                            position:"bottom-center"
                        });
                    }
                })
                .catch(error=>{
                    toast.error("Server is not responding",{
                        position:"bottom-center"
                    });
                })
        }
        else{
            toast.error("Please fill up all field",{
                position:"top-center"
            });
        }
    }
    render() {
        let serial = 1;
        const myEventData = this.state.eventData;
        const myView = myEventData.map((data,index)=>{
            return (
                <tr key={serial++}>
                    <td><img alt="None" style={{width:70,height:80}} src={data.image}/></td>
                    <td>{data.category}</td>
                    <td>{data.event}</td>
                    <td>{data.description}</td>
                    <td>{data.date}</td>
                    <td>{data.status}</td>
                    <td>{data.featured}</td>
                    <td>
                        <button className='btn btn-info' type="submit" onClick={() => this.onEdit(data.id,data.event)}>Edit</button>{' '}
                        <button className='btn btn-danger' type="submit" onClick={() => this.onDelete(data.id)}>Delete</button>
                    </td>
                </tr>
            );
        })
        let uniqueKey = 1;
        const myCategoryData = this.state.categoryData;
        const myCategoryView = myCategoryData.map((data,index)=>{
            return (
                    <option key={uniqueKey++} value={data.category}>{data.category}</option>
            );
        })
        return (
            <Fragment>
                <div style={{margin:30}} className="justify-content-center">
                    <div style={{display:'flex'}} className="justify-content-between">
                        <h1>Event List</h1>
                        <button style={{margin:5}} onClick={this.modalOnShow} className='btn btn-dark'>Add Event</button>
                    </div>
                    <Table>
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Event</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Featured</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {myView}
                        </tbody>
                    </Table>
                </div>
                {/* Modal For Add New Event */}
                <Modal show={this.state.modalShow} onHide={this.modalOnClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.onFormSubmit} style={{padding:10}}>
                            <Form.Group className="mb-3" controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Select onChange={this.categoryOnChange}>
                                    {myCategoryView}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="event">
                                <Form.Control onChange={this.eventOnChange} type="text" placeholder="Enter Event" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Control onChange={this.descriptionOnChange} type="text" placeholder="Enter Description" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Event Date</Form.Label>
                                <Form.Control onChange={this.dateOnChange} type="date"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control onChange={this.imageOnChange} type="file"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="status">
                                <div onChange={this.statusOnChange} className="mb-3">
                                    <Form.Check inline label="Enable" value="Enable" type="radio" name="group1" id="inline-radio-1"/>
                                    <Form.Check inline label="Disable" value="Disable" type="radio" name="group1" id="inline-radio-2"/>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="featured">
                                <div onChange={this.featureOnChange} className="mb-3">
                                    <Form.Check inline label="Featured Event" type="checkbox"/>
                                </div>
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Submit
                            </Button>{"  "}
                            <Button variant="secondary" onClick={this.modalOnClose}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                {/* Modal For Edit Event */}
                <Modal show={this.state.editModalShow} onHide={this.editModalOnClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.editFormSubmit} style={{padding:10}}>
                            <Form.Group className="mb-3" controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Select onChange={this.editCategoryOnChange}>
                                    {myCategoryView}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="event">
                                <Form.Control onChange={this.editEventOnChange} type="text" placeholder={this.state.editEventValue} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Control onChange={this.editDescriptionOnChange} type="text" placeholder="Update Description" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Event Date</Form.Label>
                                <Form.Control onChange={this.editDateOnChange} type="date" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control onChange={this.editImageOnChange} type="file" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="status">
                                <div onChange={this.editStatusOnChange} className="mb-3">
                                    <Form.Check inline label="Enable" value="Enable" type="radio" name="group1" id="inline-radio-1"/>
                                    <Form.Check inline label="Disable" value="Disable" type="radio" name="group1" id="inline-radio-2"/>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="featured">
                                <div onChange={this.editFeatureOnChange} className="mb-3">
                                    <Form.Check inline label="Featured Event" type="checkbox"/>
                                </div>
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Update
                            </Button>{"  "}
                            <Button variant="secondary" onClick={this.editModalOnClose}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <ToastContainer/>
            </Fragment>
        );
    }
}

export default Event;