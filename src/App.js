import React, {useState} from 'react';
import Search from "./Components/Search"
import Results from "./Components/Results"
import PopUp from "./Components/popUp"
import axios from "axios"


function App() {

	const [state, setState] = useState({
		s:"", 
		results:[],
		selected: {}
	})

	const apiurl = "http://www.omdbapi.com/?apikey={/* PUT YOUR API KEY HERE */}";

	const search = (e) =>{
		if(e.key === "Enter"){
			axios(apiurl + "&s=" + state.s).then( ({data}) => {
				let results = data.Search;

				setState((prevState)=>{
					return {...prevState, results: results}
				})
			})
		}
	}



	const handleInput = (e) =>{
		let s = e.target.value;

		setState(prevState =>{
			return {...prevState, s:s}
		})
		console.log(state.s)
	}

	const openPopup = id =>{
		axios(apiurl +"&i=" + id).then(({ data }) =>{

			let result = data
			
			setState(prevState => {
				return {...prevState, selected: result }
			})
		})

	}

	const closePopUp = () =>{ 
		setState(prevState=>{
				return { ...prevState, selected: {}}
		})
	}

  return (
    <div>
     <header> <h1>MOVIES DB</h1></header>
     <main>

     	<Search handleInput={handleInput} search={search}/>
     	<Results results={state.results} openPopup={openPopup}/>
     	 {(typeof state.selected.Title != "undefined") ? <PopUp selected={state.selected} closePopUp={closePopUp} /> : false}
     	 
     </main>
    </div>
  );
}

export default App;
