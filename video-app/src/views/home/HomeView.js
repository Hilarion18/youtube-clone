import React, { Component } from 'react';
// import {
//   Button,
//   Panel,
//   Grid,
//   Row,
//   Col,
//   Glyphicon
// } from 'react-bootstrap';
// import ReactDOM from 'react-dom';
import axios from 'axios'
import config from '../../config.js'
// import LinkTableData from './component/LinkTableData'
import './style/HomeStyle.css'

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      contents: [],
      link: {
        longUrl: '',
      },
      isTyping: false,
    };
  }

  componentDidMount() {
    localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJVamFuZyIsImlhdCI6MTU4MTE1NDgxOSwiZXhwIjoxNTgzNzQ2ODE5fQ.vfhuNGPjlN1eTCyDSyVCdnx8-E3QZDmPt8lQAHEmTTE")
    this.getLinkDatas()
  }

  handleChange = (event) => {
    this.setState({
      link: {
        longUrl: event.target.value 
      },
      isTyping: true
    })
    if (event.target.value === '') {
      this.setState({
        isTyping: false
      })
    }
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
        console.log(`get data`, res.data.data)
        this.setState({
          contents: res.data.data
        })
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  handleAddLink = (val) => {
    val.preventDefault();
    this.setState({
      link: {
        longUrl: ''
      }
    });
    axios({
      method: 'POST',
      url: `${config.port}/link`,
      data: this.state.link,
    })
      .then((res) => {
        this.getLinkDatas()
        this.setState({
          link: {
            longUrl: ""
          },
          isTyping: false
        })
      })
      .catch((err) => {
        // alert(err.message)
        alert(`There is something wrong, please insert the url or use the right url "http://.." not "www" and check your network`)
      })
  }

  removeAllLinks = () => {
      axios({
        method: `DELETE`,
        url: `${config.port}/link`,
      })
        .then((value) => {
          this.getLinkDatas()
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

  renderListItem = () => {
    return (
      <div className="container">
        <div className="banner-video">
          <div className="embed-responsive embed-responsive-21by9">
            <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/oXNn1fIXir8"></iframe>
          </div>
        </div>
        {/* <div className="ytd-rich-grid-renderer">
          <div className="">
            <iframe className="video-content"p-2 src="https://www.youtube.com/embed/oXNn1fIXir8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div className="">
            <iframe className="video-content"p-2 src="https://www.youtube.com/embed/oXNn1fIXir8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div className="">
            <iframe className="video-content"p-2 src="https://www.youtube.com/embed/oXNn1fIXir8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div> */}
        {/* <div className=""> */}
          {/* <div className="row"> */}
            <div className="row d-flex justify-content-between">
              <div className="col-sm-4">
                <iframe className="video-content" src="https://www.youtube.com/embed/oXNn1fIXir8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className="col-sm-4">
                <iframe className="video-content" src="https://www.youtube.com/embed/oXNn1fIXir8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className="col-sm-4">
              <iframe className="video-content" src="https://www.youtube.com/embed/oXNn1fIXir8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className="col-sm-4">
              <iframe className="video-content" src="https://www.youtube.com/embed/oXNn1fIXir8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className="col-sm-4">
              <iframe className="video-content" src="https://www.youtube.com/embed/oXNn1fIXir8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className="col-sm-4">
              <iframe className="video-content" src="https://www.youtube.com/embed/oXNn1fIXir8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            {/* </div> */}
        </div>
        {/* </div> */}
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="row">
          {this.renderListItem()}
        </div>
      </div>
    );
  }
}

export default HomeComponent
