import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import {NavLink} from 'react-router-dom'
import "./SearchUser.scss"

const SearchUser = ({setUser}) => {
    const [github, setGithub] = useState(null);
    const [word, setWord] = useState(localStorage.getItem('res') || null);
    const [resultSearch, setResultSearch] = useState(null);
    const [howMatch, setHowMatch] = useState(null);

useEffect(() => {
    axios.get( 'https://api.github.com/').then(res => setGithub(res))
},[])
console.log("🚀 ~ file: SearchUser.js ~ line 8 ~ SearchUser ~ github", github)

     const searchUsers = () => {
        console.log("🚀 ~ file: SearchUser.js ~ line 18 ~ searchUsers ~ word", word)
        if(word !== null){
              axios.get( `https://api.github.com/users/${word}`).then(res => setResultSearch(res.data))
         } 
     }

     const sendData = () => {
         return (
             setUser(resultSearch)
         )
     }

     const repos = () => {
    const link = resultSearch.repos_url
        axios.get(link)
        .then(res => setHowMatch(res.data.length));
        
    return howMatch;
     }
    

    return (
        <section>
            <form>
                <label>
                    <input placeholder="Search name user ..." onChange={(event) => 
                    axios.get( `https://api.github.com/users/${event.target.value}`)
                    .then(res => {
                        localStorage.removeItem('res')
                        setResultSearch(res.data)
                        localStorage.setItem('res', event.target.value)
                        })} defaultValue={word !== null ? word : ""}/>
                    {/* <Button type="button" title="search" onClick={searchUsers}/> */}
                </label>
            </form>
            <div>
                <ul>
                    { console.log("🚀 ~ file: SearchUser.js ~ line 38 ~ SearchUser ~ resultSearch", resultSearch)
                    
                    }
                    {resultSearch !== null && <NavLink to='/user' onClick={sendData}>
                        <div className="find_link_box">
                            <picture>
                                <img className="img_avatar_box" src={resultSearch.avatar_url}/>
                            </picture>
                        <p>{resultSearch.login} </p>
                         <span> Repo: {repos()}</span>
                        </div>
                        </NavLink>}
                </ul>
            </div>
        </section>
    )
}
                   

SearchUser.propTypes = {

}

export default SearchUser
