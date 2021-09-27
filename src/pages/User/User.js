import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '../../components/Button/Button';
import './User.scss';

const User = ({user}) => {
    const [repos, setRepos] = useState(null);
    const [rep, setRep] = useState(null);
    const [findRep, setFindRep] = useState(null);
   
const check = (checked) => {
        if(checked!==null){
            return checked;
        }
    return "absent"
    };

    useEffect(() => {
        axios.get( `https://api.github.com/users/${user.login}/repos`).then(res => setRepos(res.data))
    }, []);

const searchRepo = () => {
         if(0 === rep.length){
          return  setFindRep(null)
          }
            axios.get( `https://api.github.com/repos/${user.login}/${rep}`)
    .then(res => {  
        console.log(res);
       
        setFindRep(res.data);
        console.log(res.data) ;  
})

}
const dataRep = () => {
    let reposDataName = null;
      if(findRep !== null  ){
        reposDataName =  <li  className="repos_box">
    <a  href={findRep.clone_url}>
    <span>{findRep.name}</span> </a>
    <div>
    <p>Fork: {findRep.forks }</p>
    <p>Star: {findRep.stargazers_count}</p>
    </div>
</li>

    }
    else{reposDataName = repos.map((item, i) => 
    <li key={i} className="repos_box">
         <a  href={item.clone_url}>
         <span>{item.name}</span> </a>
         <div>
         <p>Fork: {item.forks }</p>
         <p>Star: {item.stargazers_count}</p>
         </div>
    </li>
    )
    }
return reposDataName;
}

    return (
        <section>
            <div className='header_user'>
            <picture>
                <img src={user.avatar_url}/>
            </picture>
            <div>
                <p>Login: {user.login}</p>
                <p>Location: {check(user.location)}</p>
                <p>Email: {check(user.email)}</p>
                <p>Join Date: {user.created_at}</p>
                <p>{user.followers} Followers</p>
                <p> Following {user.following}</p>
            </div>
            
        </div>
        <form>
        <label>
            <input placeholder="Search name repo ..." onChange={(event) => setRep(event.target.value)}/>
            <Button type="button" title="search" onClick={searchRepo}/>
        </label>
    </form>
    <ul>
        
        {repos!==null&&dataRep()}
    </ul>
    </section>
        
    )
}

User.propTypes = {
user: PropTypes.object.isRequired
}

export default User;
