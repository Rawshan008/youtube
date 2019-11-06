import React, {Component, Fragment} from 'react';
import {Button, Col, Container, Form, Modal, ResponsiveEmbed, Row} from "react-bootstrap";
const axios = require('axios');

const API = 'AIzaSyBDxIsFKm3sOxMo4_Yt02sovL4yKOwgAEY';
const maxNumber = '9';


class Youtube extends Component {
    constructor(){
        super();

        this.state = {
            items: [],
            showMod: false
        }

        this.channelIdSubmit = this.channelIdSubmit.bind(this);
    }

    channelIdSubmit(event){
        event.preventDefault();

        const channelId = event.target.channelid.value;
        console.log(channelId);
        const finalUrl = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxNumber}`
        axios.get(finalUrl)
            .then(res=>{
                var items = res.data.items;
                const result = items.map(item=> item.id.videoId);
                this.setState({items:result})
            })
    }

    showModal = () =>{this.setState({showMod: true})}
    hideModal = () =>{this.setState({showMod: false})}
    render() {




        return (
            <Fragment>
                <Container className="mt-5 mb-5" >
                    <Row>
                        <Col lg={{span:6, offset:3}}>
                            <Form onSubmit={this.channelIdSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Please Enter Channel Id</Form.Label>
                                    <Form.Control type="text" placeholder="Channel Id" name="channelid" ref="channelid" />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>


                <Container className="mb-5">
                    <Row>
                        {
                            this.state.items.map((link,i)=>{
                                var thumbnail = `https://i.ytimg.com/vi/${link}/maxresdefault.jpg`;
                                var videos = `https://www.youtube.com/embed/${link}`;
                                var allResult = <Col key={i} lg={4} md={6} sm={12}>
                                    <div className="singleVideo">
                                        <img className="thumbnailImg" onClick={this.showModal} src={thumbnail} alt=""/>
                                    </div>
                                    <Modal size="lg" show={this.state.showMod}>
                                        <Modal.Body>
                                            <ResponsiveEmbed aspectRatio="16by9">
                                                <embed type="image/svg+xml" src={videos}/>
                                            </ResponsiveEmbed>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="danger" onClick={this.hideModal}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Col>

                                return allResult;
                            })
                        }
                    </Row>
                </Container>

            </Fragment>
        );
    }
}

export default Youtube;