
import React, { Component } from 'react';
import axios from "axios";
//import CL from './craigslist';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      make: '',
      model: '',
      year: 0,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCraigslist = this.handleCraigslist.bind(this);
    this.handleBluebook = this.handleBluebook.bind(this)
  }



  handleChange(e) {
    // const target = e.target;
    // const value = target.value;
    // const name = target.name;
    // this.setState({[name]: value});

    this.setState({ [e.target.name]: e.target.value });
  }


  // handleClick(e) {
  //   e.preventDefault();
  //   var searchValue = [this.state.make + this.state.model + this.state.year];
  //   var imageurl = 'https://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=' + searchValue;
  //   console.log(imageurl);

  //   axios.get(imageurl)
  //   .then(response =>{
  //     // getElementsByTagName(string).textContent
  //     console.log(response)
  //   })

    
  // }

  handleClick(e) {
    e.preventDefault();

    var searchValue = [this.state.make + this.state.model + this.state.year];
    var localCarApi = '/cardata?searchTerm=' + searchValue;
    console.log(localCarApi);

    axios.get(localCarApi)
    .then(response =>{ 
      console.log("Response from our own api", response.data.url);
      document.getElementById('myImg').src = response.data.url;
    })

 
  }

  handleCraigslist(e) {
    var url = window.open("https://sandiego.craigslist.org/search/sss?query=" + this.state.make + " " + this.state.model + " " + this.state.year)
    return url;
  }

  handleBluebook(e) {
    var url = window.open("https://www.kbb.com/" + this.state.make + "/" + this.state.model + "/" + this.state.year +"/categories/?intent=buy-used&pricetype=retail")
    return url;
  }


  


render() {

  return (
    <div className='App'>
      <div className='container'>
        <div className="card">
          <div className="card-header">
            <h1 className='title'><strong>Vehicle Search</strong></h1>
          </div>
          <div className="card-body">

            <h4 className="subtitle">Search any vehicle for sale and actual value in San Diego.</h4>

            <div className="input-group">

              <div className="input-group-prepend">
                <span className="input-group-text">Make</span>
                <input type="text" className="form-control" id="make" name="make" value={this.state.make} onChange={this.handleChange} />
              </div>
              <div className="input-group-prepend">
                <span className="input-group-text">Model</span>
                <input type="text" className="form-control" id="model" name="model" value={this.state.model} onChange={this.handleChange} />
              </div>
              <div className="input-group-prepend">
                <span className="input-group-text">Year</span>
                <input type="number" className="form-control" id="year" name="year" value={this.state.year} onChange={this.handleChange} />
              </div>
            </div>

          </div>
          <div className="card-footer">
            <button type="button" className="btn btn-info" onClick={this.handleClick}>Search</button>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <img src="" id="myImg" className="img-fluid" alt="Responsive image"></img>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <a type="button" name="link" className="btn btn-link" onClick={this.handleCraigslist}>CL link</a>
            <a type="button" name="link" className="btn btn-link" onClick={this.handleBluebook}>BB link</a>
          </div>
        </div>
        <br />
        {/* <div>
          {this.state.topspots.map(topspot => (
            <Topspot 
              key={topspot.id}
              name={topspot.name}
              description={topspot.description}
              location={topspot.location}/>
            ))
          }
        </div> */}
      </div>
    </div>
  );
}
  }

export default App;
