import Axios from 'axios';
import React from 'react'

class Patients extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userType: "",
      list: []
    };

  }

  loadData(){

    Axios.get("http://localhost:8080/Patient").then(resp => {
      this.setState({list: resp.data});
    })
    
  }

  componentDidMount = () =>{
    this.loadData();
    console.log(this.state.list)
  }

  //CURRENTLY ONLY SEARCHES BY NAME. NOT ID
  searchPatients(){

    //inspired by https://www.w3schools.com/howto/howto_js_filter_lists.asp
    var input, filter, ul, listData, li ,txtValue;

    //get all elements from the page
    input = document.getElementById('prescriptionSearch');
    filter = input.value.toUpperCase();
    ul = document.getElementById("prescriptionList");
    li = ul.getElementsByTagName("li");

    //for each list item of the list
    for (var i = 1; i < li.length; i++){
      
      //get all div elements inside list element
      var divs = li[i].getElementsByTagName("div");
      for (var j = 1; j < 4 ; j++){
        //get the data from the div
        listData = divs[j];
        //add the text inside th div to the text value
        txtValue += listData.textContent || listData.innerText;
      }
      
      
      //make the text value uppercase for comparison
      if (txtValue.toUpperCase().indexOf(filter) > -1){
        //if its not found hide the element
          li[i].style.display ="";
      }else{
        //if the substring is found show it
          li[i].style.display ="none";
      }

      //reset the text value
      txtValue = "";
      
    }

  }
  
  render(){
  return (
    <div className='main'>
      <h1>Doctors list of patients</h1>


      <input type="text" id="prescriptionSearch" className='searchBox' onKeyUp={this.searchPatients} placeholder="Search patients..."></input>
      <br/>

      <div className='almostFullScrollDiv'>

        <ul className='prescriptionList' id="prescriptionList">

            <li className="prescriptionListItem">
                <div>ID</div>
                <div>Email</div>
                <div>First Name</div>
                <div>Last Name</div>
                <div>Score</div>
            </li>

          {this.state.list.map(item => (
              <li key={item.userId} className="prescriptionListItem">
                <div>{item.userId}</div>
                <div>TBD</div>
                <div>{item.name}</div>
                <div>TBD</div>
                <div>TBD</div>
             </li>
            ))}
        </ul>
      </div>
    </div>
  )}
}

export default Patients
