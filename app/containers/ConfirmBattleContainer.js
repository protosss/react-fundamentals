// app/containers/ConfirmBattleContainer.js
var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelpers = require('../utils/githubHelpers');

var ConfirmBattleContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired // เป็นคำสั่งสำหรับ router ไป path อื่น ถ้าไม่ใส่จะทำการ router ไม่ได้
    },
    getInitialState: function () {
        //console.log('getInitialState');
        return {
            isLoading: true,
            playersInfo: [],
        }
    },
    componentDidMount: function () {  //Function นี้ทำงานอัตโนมัติเมื่อมีการเรียกใช้ ConfirmBattleContainer เรียกว่า React Life Cycle อ่านจากบทที่ 7

        var query = this.props.location.query;
        githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo]) //เรียกใช้ Function getPlayersInfo Function นี้จะดึงข้อมูล info ใน github มาให้แต่ต้องมีการกรอกชื่อ playerOne และ playerTwo ก่อนนะ
            .then(function (players) {
                this.setState({
                    isLoading: false,
                    playersInfo: [players[0], players[1]]
                })
            }.bind(this)) //ทำการ binding this ให้ใช้ใน function ได้ถ้าไม่ใส่ข้างในจะให้คำสั่ง this.setstate ไม่ได้
    },
    handleInitiateBattle: function () {
        //console.log(this.props + '555');
        this.context.router.push({
            pathname: '/results',
            state: {
                playersInfo: this.state.playersInfo
            }
        })
    },
    render: function () {
        //console.log(this.props);
        return (
            <ConfirmBattle
                isLoading={this.state.isLoading}
                onInitiateBattle={this.handleInitiateBattle}
                playersInfo={this.state.playersInfo} />
        )
    }
});

module.exports = ConfirmBattleContainer;