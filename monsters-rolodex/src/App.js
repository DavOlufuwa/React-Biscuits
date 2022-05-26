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


  // this is what we are rendering we use the render method.
  render(){
    const filteredMonsters = this.state.monsters.filter((monster)=>{
        return monster.name.toLocaleLowerCase().includes(this.state.searchValue);
    });

    return (
      <div className="App">
        <input className ='search-box' type='search' placeholder = 'Search Monsters' onChange={(e)=>{
          const searchValue = e.target.value.toLocaleLowerCase();
          this.setState(()=>{
            return{searchValue};
          })
        }}/>
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
