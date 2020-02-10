import React, { Component } from 'react';
import { w3cwebsocket as Ws } from "websocket";
import axios from 'axios'
import config from '../../config.js'
import './style/HomeStyle.css'

// const extraHeaders = {
//     Authorization: localStorage.getItem('token')
// }
// const client = new Ws('ws:https://bagidata.com:3030/video', {
//   protocolVersion: 8,
//   rejectUnauthorized: false 
//   }
// );

// const webSocketsServerPort = 8000;
// const webSocketServer = require('websocket').server;
// const http = require('http');
// const server = http.createServer();
// server.listen(webSocketsServerPort);
// const wsServer = new webSocketServer({
//   httpServer: server
// });

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      isTyping: false,
      vote: 1,
      like: 0,
      dislike: 0,
      contents: []
    };
  }

  componentDidMount() {
    this.getLinkDatas()
  }
  
  getLinkDatas = async () => {
    axios({
      method: 'GET',
      url: `${config.port}/video`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then((res) => {
        this.setState({
          contents: res.data.data
        })
        console.log(`this.state.contents`, this.state.contents)
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  copyToClipboard(val) {
    const item = document.createElement('textarea')
    item.value = val
    item.setAttribute('type', 'text')
    document.body.appendChild(item)
    item.select()
    document.execCommand('copy');
    document.body.removeChild(item);

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      alert(`your url ${val} has been copied ` + msg);
    } catch (err) {
      alert('Oops, unable to copy');
    }

    /* unselect the range */
    window.getSelection().removeAllRanges()
  }

  like = (vote, content_id) => {
    let data = this.state.contents
    data.map((val, idx) => {
      if (val.id  === content_id) {
        if (this.state.like < 1) {
          val.likers += this.state.vote
          this.setState({
            vote: 0,
            like: 1,
            dislike: 0,
            contents: data
          })
        } else {
          val.likers -= this.state.like
          this.setState({
            vote: 1,
            like: 0,
            dislike: 0,
            contents: data
          })
        }
      }
    })
  }

  dislike = (vote, content_id) => {
    let data = this.state.contents
    data.map((val, idx) => {
      if (val.id  === content_id) {
        if (this.state.dislike < 1) {
          val.dislikers += this.state.vote
          this.setState({
            vote: 0,
            dislike: 1,
            like: 0,
            contents: data
          })
        } else {
          val.dislikers -= this.state.dislike
          this.setState({
            vote: 1,
            dislike: 0,
            like: 0,
            contents: data
          })
        }
      }
    })
  }

  renderCommend = (comments) => {
    return (
      comments.map((item, index) => {
        return (
          <div key={index} className="text-left">
            <div className="user_commend">{item.username}</div>
            <div className="item_commend">{item.comment}</div>
            <div className="date_commend">{item.created_date}</div>
          </div>
        )
      })
    )
  }

  renderListItem = () => {
    return (
      this.state.contents.map((item, index) => {
        return (
          <div key={index} className="content-area">
            <div className="col-sm-4">
              <iframe className="video-content" src={item.media_url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              <div className="title-video">{item.title}</div>
              <div className="description-video">{item.description}</div>
              <div className="text-right">
                <div className="likers-video fa fa-thumbs-up" onClick={() => this.like(item.likers, item.id)}>{item.likers}</div>
                <div className="dislikers-video fa fa-thumbs-down" onClick={() => this.dislike(item.dislikers, item.id)}>{item.dislikers}</div>
              </div>
              { 
                0 < item.comments.length
                ? this.renderCommend(item.comments)
                : null
              }
            </div>
          </div>
        )
      })
    )
  }

  render() {
    // client.onopen = () => {
    //   console.log('WebSocket Client Connected');
    // };
    // client.onmessage = (message) => {
    //   console.log(message);
    // };
    return (
      <div className="container">
        <div className="banner-video">
          <div className="embed-responsive embed-responsive-21by9">
            <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/xoC27xAG0-s"></iframe>
          </div>
        </div>
        <div className="row d-flex justify-content">
          {
            this.state.contents !== undefined && 0 < this.state.contents.length
            ? this.renderListItem()
            : null
          }
        </div>
      </div>
    );
  }
}

export default HomeComponent
