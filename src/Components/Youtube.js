import React, {Component, Fragment} from 'react';
import {Col, Container, Form, ResponsiveEmbed, Row} from "react-bootstrap";
const axios = require('axios');

const API = 'AIzaSyBDxIsFKm3sOxMo4_Yt02sovL4yKOwgAEY';
const maxNumber = '9';


class Youtube extends Component {
    constructor(){
        super();

        this.state = {
            items: [],
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
                const result = items.map(item=> "https://www.youtube.com/embed/"+item.id.videoId);
                this.setState({items:result})
            })
    }
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
                                var allResult = <Col key={i} lg={4} md={6} sm={12}>
                                    <div className="singleVideo">
                                        <ResponsiveEmbed aspectRatio="16by9">
                                            <embed type="image/svg+xml" src={link}/>
                                        </ResponsiveEmbed>
                                    </div>
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