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
      this.state.contents.map((item, index) => {
        return (
          <div key={index}>
            <div className="col-sm-4">
              {/* <img id="img" class="style-scope yt-img-shadow" alt="" width="9999" src="https://i.ytimg.com/vi/LvNJC7Nj8mw/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&amp;rs=AOn4CLC4t1AkZ8TMw640p8fwcAezwQg1hw"/> */}
              <iframe className="video-content" src={item.media_url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        )
      })
    )
  }

  render() {
    var ws = new WebSocket("https://bagidata.com:3030/video");

    ws.onopen = function() {
        console.log("Koneksi berhasil!");
    };
    return (
      <div className="container">
        {/* <div className="banner-video">
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
        </div> */}
      </div>
    );
  }
}

export default HomeComponent
