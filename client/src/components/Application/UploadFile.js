import React, {Component} from 'react'
import {Input} from 'reactstrap'

export default class UploadFile extends Component {
    constructor(props) {
        super(props);
    }

    // Reads the file contents and updates trip in application
    loadFile(event){
        this.props.updateTrip('distances', []);
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (event)=> {
            //console.warn("file data",event.target.result);
            const object = JSON.parse(event.target.result);
            //console.log(object);
            for (var key in object){
                var value = object[key];
                this.props.updateTrip(key,value);
            }
        }
    };

    render() {
        return (
            <div>
                <br/>
                <Input id={"title"} placeholder="Name Your Trip" value={this.props.trip.title}
                       onChange={(event)=>this.props.updateTrip('title', event.target.value)}/>
                <br/>
                <p align="Center"> Upload Your File </p>
                <Input title="upload" type="file" id="fileInput" onChange={(event)=>this.loadFile(event)}/>
            </div>
        )
    }
}
