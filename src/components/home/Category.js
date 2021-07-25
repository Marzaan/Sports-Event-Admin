import React, {Component, Fragment} from 'react';
import {Button, Table, Modal} from "react-bootstrap";
import ApiURL from "../../api/ApiURL";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import Form from "react-bootstrap/Form";

class Category extends Component {
    constructor() {
        super();
        this.state = {
            category: '',
            editID: '',
            editCategory: '',
            editCategoryValue: '',
            modalShow: false,
            editModalShow: false,
            categoryData: []
        }
        this.modalOnShow = this.modalOnShow.bind(this);
        this.modalOnClose = this.modalOnClose.bind(this);
        this.editModalOnShow = this.editModalOnShow.bind(this);
        this.editModalOnClose = this.editModalOnClose.bind(this);
    }
    componentDidMount() {
        axios.get(ApiURL.getCategory)
            .then(response=>{
                this.setState({categoryData:response.data});
            })
    }
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
        this.setState({editCategoryValue:name});
        this.editModalOnShow();
    }
    onDelete(id){
        axios.get(ApiURL.deleteCategory(id))
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
    editFormSubmit=(event)=>{
        event.preventDefault();
        let editCategory = this.state.editCategory;
        if(editCategory===null){
            toast.error("Category Field Empty",{
                position:"top-center"
            });
        }
        else{
            let myFormData = new FormData();
            myFormData.append("category",editCategory);

            axios.post(ApiURL.updateCategory(this.state.editID),myFormData)
                .then(response=>{
                    if(response.data===0){
                        toast.error("This Category already added",{
                            position:"bottom-center"
                        });
                    }
                    else{
                        this.setState({editModalShow:false});
                        this.componentDidMount();
                        toast.success("Category successfully updated",{
                            position:"top-center"
                        });
                    }
                })
                .catch(error=>{
                    toast.error("Server is not responding",{
                        position:"bottom-center"
                    });
                })
        }
    }
    categoryOnChange=(event)=>{
        let category = event.target.value;
        this.setState({category:category});
    }
    onFormSubmit=(event)=>{
        event.preventDefault();
        let category = this.state.category;
        if(category===null){
            toast.error("Category Field Empty",{
                position:"top-center"
            });
        }
        else{
            let myFormData = new FormData();
            myFormData.append("category",category);

            axios.post(ApiURL.addCategory,myFormData)
                .then(response=>{
                    if(response.data===1){
                        this.setState({modalShow:false});
                        this.componentDidMount();
                        toast.success("Category successfully added",{
                            position:"top-center"
                        });
                    }
                    else{
                        toast.error("This Category already added",{
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
    }
    render() {
        let serial = 1;
        const myCategoryData = this.state.categoryData;
        const myView = myCategoryData.map((data,index)=>{
            return (
                <tr key={serial}>
                    <td>{serial++}</td>
                    <td>{data.category}</td>
                    <td>
                        <button className='btn btn-info' type="submit" onClick={() => this.onEdit(data.id,data.category)}>Edit</button>{' '}
                        <button className='btn btn-danger' type="submit" onClick={() => this.onDelete(data.id)}>Delete</button>
                    </td>
                </tr>
            );
        })
        return (
            <Fragment>
                <div style={{margin:50,marginLeft:200,marginRight:200}} className="justify-content-center">
                    <div style={{display:'flex'}} className="justify-content-between">
                        <h1>Category List</h1>
                        <button style={{margin:5}} onClick={this.modalOnShow} className='btn btn-dark'>Add Category</button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {myView}
                        </tbody>
                    </Table>
                </div>
                <Modal show={this.state.modalShow} onHide={this.modalOnClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.onFormSubmit} style={{padding:10}}>
                            <Form.Group className="mb-3" controlId="category">
                                <Form.Control onChange={this.categoryOnChange} type="text" placeholder="Enter Category" />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.modalOnClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.editModalShow} onHide={this.editModalOnClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.editFormSubmit} style={{padding:10}}>
                            <Form.Group className="mb-3" controlId="category">
                                <Form.Control onChange={this.editCategoryOnChange} type="text" placeholder={this.state.editCategoryValue} />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Update
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.editModalOnClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <ToastContainer/>
            </Fragment>
        );
    }
}

export default Category;