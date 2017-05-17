// app/containers/PromptContainer.js
var React = require('react');
var styles = require('../styles');

var PromptContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            username: ''
        }
    },
    onUpdateUser: function (event) {
        //console.log(event.target)
        this.setState({
            username: event.target.value
        });
    },
    onSubmitUser: function (e) {
        e.preventDefault();
        var username = this.state.username;
        this.setState({
            username: ''
        });

        if (this.props.routeParams.playerOne) {
            this.context.router.push({
                pathname: '/battle',
                query: {
                    playerOne: this.props.routeParams.playerOne,
                    playerTwo: this.state.username,
                }
            })
        } else {
            this.context.router.push('/playerTwo/' + this.state.username)
        }
    },

    render: function () {
        //console.log(this.props);
        return (
            <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={styles.transparentBg}>
                <h1>{this.props.route.header}</h1>
                <div className="col-sm-12">
                    <form onSubmit={this.onSubmitUser}>
                        <div className="form-group">
                            <input
                                className='form-control'
                                placeholder='Github Username'
                                onChange={this.onUpdateUser}
                                defaultValue={this.state.username}
                                type='text' />
                        </div>
                        <div className="form-group col-sm-4 col-sm-offset-4">
                            <button
                                className="btn btn-block btn-success"
                                type="submit">
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
});

module.exports = PromptContainer;