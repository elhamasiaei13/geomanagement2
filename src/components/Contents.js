import React, { Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Routes from './routes/Routes';

function Contents(props) {
    return (
        <>
            <Switch>
                <Suspense fallback={<> loading </>}>
                    {Routes.map((route, key) => (

                        <Route {...route} {...props} key={key} />
                    ))}
                </Suspense>
            </Switch>
        </>
    );
}

export default withRouter(Contents);