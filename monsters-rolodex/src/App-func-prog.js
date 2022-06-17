import { useEffect } from 'react';
import { useState } from 'react';

import CardList from './components/card-list/card-list.component'
import SearchBox from './components/Search-box/search-box.component'
import './App.css';

const AppFuncProg = ()=>{
  console.log('render')
  // using useState

  const [searchField, setSearchField] = useState(''); //it will give us [value, setValue]
  const [monsters, setMonsters]= useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);


    //the usestate() is allowing us to use values from the  state in our onSearchChange() function. The state has been limited to the searchfield
    
    //triggering side effect with useEffect() hook 
    useEffect(()=>{
      fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users)=>setMonsters(users))
    }, [])

    // useEffect for filtered monsters
    useEffect(()=>{
      const newFilteredMonsters = monsters.filter((monster)=>{
        return monster.name.toLocaleLowerCase().includes(searchField);
      });

      setFilteredMonsters(newFilteredMonsters);
    },[monsters, searchField]);


    const onSearchChange = (e)=>{
    const searchFieldValue = e.target.value.toLocaleLowerCase();
    setSearchField(searchFieldValue);
   }



  

  return (
    <div className="App">
         <h1 className='title'>MONSTERS ROLODEX</h1>
         <SearchBox className='search-box' placeholder="search monsters here" onChangeHandler={onSearchChange} /> 
          <CardList monsters={filteredMonsters} /> 
      </div>
      );
      
}

export default AppFuncProg