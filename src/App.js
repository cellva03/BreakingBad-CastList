import './App.css';
import Search from './components/ui/Search';
import Header from './components/ui/Header.js'
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate'
import ComponentGrid from './components/characters/CharacterGrid.js'
import Footer from './components/ui/Footer';

const App = () => {
  const [items,setItems] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [currentPage, setcurrentPage]= useState(1);
  const [charPerPage] = useState(9);
  const [query,setQuery] = useState([]);


  useEffect (() =>{
    const fetchItems = async() =>{
      setIsLoading(true)
      const result = await axios(`https://www.breakingbadapi.com/api/characters?name=${query}`)
      // console.log(result.data);
      setItems(result.data)
      setIsLoading(false)
    }
    fetchItems()
  },[query]);
  // console.log(items); 
  const indexOfLastItem = currentPage * charPerPage;
  const indexOfFirstItem = indexOfLastItem - charPerPage;
  const currentItems = items.slice(indexOfFirstItem,indexOfLastItem);
  const pageCount = Math.ceil(items.length/charPerPage)

  const changePage =({selected})=>{
    setcurrentPage(selected)
  }
  return (
    <div className="App">
      <Header/>
      <Search getQuery ={(q)=> setQuery(q)} />
      <ComponentGrid isLoading={isLoading} items={currentItems}/><br/>
      <ReactPaginate
      previousLabel={'Prev'}
      nextLabel={'next'}
      pageRangeDisplayed={4}
      pageCount ={pageCount}
      onPageChange ={changePage}
      containerClassName={'paginationBtn'}
      previousLinkClassName={'previousBtn'}
      nextLinkClassName={'nextBtn'}
      activeClassName={'pageActive'}
      disabledClassName={'disabledPagination'}
      />
      <Footer/>
    </div>
  );
}

export default App;
