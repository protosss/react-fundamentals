// app/config/routes.js
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('../components/Main');
var Home = require("../components/Home");
var PromptContainer = require("../containers/PromptContainer");
var ConfirmBattleContainer = require('../containers/ConfirmBattleContainer');
var ResultsContainer = require('../containers/ResultsContainer');

var routes = (
    <Router history={browserHistory}>
        <Route path='/' component={Main}>
            <IndexRoute component={Home} />
            <Route path='playerOne' header='Player One ..' component={PromptContainer} />
            <Route path='playerTwo/:playerOne' header='Player Two' component={PromptContainer} />
            <Route path='battle' component={ConfirmBattleContainer} />
            <Route path='results' component={ResultsContainer} />
        </Route>
    </Router>
);
//:playerOne เป็น route parameter ดังนั้น แปลว่า หากเมื่อใดที่เรา route ไปที่ /playerTwo/himaeng นั่นแปลว่า ค่า route parameter ที่ชื่อว่า playerone จะเท่ากับ ‘himaeng’ ไปในทันที
module.exports = routes;