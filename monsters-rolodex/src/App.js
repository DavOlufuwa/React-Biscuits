import { Component } from 'react';

import logo from './logo.svg';
import './App.css';
// turning the original function into a Class that extends from the super Class "Component"
class App extends Component {

  constructor(){
    super();

    this.state = {
      monsters :[],
 
      searchValue: ''

    };
  }
  // fetching data from the API returns a promise
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.json()).then((users)=> this.setState(()=>{
      return{
        monsters: users
      }
    }))
  }
  // A Secondary CallBack Function is not always necessary
  onSearchChange = (e)=>{
    const searchValue = e.target.value.toLocaleLowerCase();
    this.setState(()=>{
      return{searchValue};
    })
  }

  // this is what we are rendering we use the render method.
  // this is what will show up on our screens.
  render(){

    // destructuring
    const {monsters, searchValue} = this.state;
    const {onSearchChange} = this;

    // filter to search for anything in the searchbar
    const filteredMonsters = monsters.filter((monster)=>{
        return monster.name.toLocaleLowerCase().includes(searchValue);
    });
    
    return (
      <div className="App">
        <input className ='search-box' type='search' placeholder = 'Search Monsters' onChange={onSearchChange}/>
        <h1>
         {
           filteredMonsters.map((monster)=>{
              return<div key={monster.id}>{monster.name}</div>
           })
         }
        </h1>
      </div>
    );
  }
}

export default App;
