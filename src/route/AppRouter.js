import React, { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router';

import SearchUser from '../pages/SearchUsers/SearchUser'
import User from '../pages/User/User';

 const AppRouter = () => {
     const [user, setUser] = useState(null);
    return (
        <section>
            <Switch>
                <Redirect exact path="/" to="/search" />
                <Route exact path="/search">
                    <SearchUser setUser={setUser}/>
                </Route>
                <Route exact path="/user">
                    <User user={user}/>
                </Route>
            </Switch>
        </section>
    )
}
export default AppRouter;
