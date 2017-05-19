// app/containers/PromptContainer.js
var React = require('react');
var styles = require('../styles');
var Prompt = require('../components/Prompt');

var PromptContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired  // เป็นคำสั่งสำหรับ router ไป path อื่น ถ้าไม่ใส่จะทำการ router ไม่ได้
    },
    getInitialState: function () { //เป็นการ Assign ค่าตัวแปร function นี้จะทำงานในครั้งแรกที่มีการใช้งาน Container เหมือน .net
        //console.log('state');
        return {
            username: 'protosss'
        }
    },
    handleUpdateUser: function (event) { //สร้าง Function กรณีที่มีการ Keyup ให้เรียก Function นี้
        //console.log(event.target)
        this.setState({
            username: event.target.value
        });
    },
    handleSubmitUser: function (e) { //สร้าง Function ในการกดปุ่ม Submit 
        e.preventDefault();  // ???? ในเว็บไม่ได้อธิบาย
        var username = this.state.username; // สร้างตัวแปรเพื่อรับค่าจาก text input
        this.setState({  // ทำการ Set ค่าของ username ใน State ให้เป็นค่าตามต้องการ ในเว็บจะให้ใส่เป็นค่าว่างคือเมื่อกดปุ่มไปหน้า playerTwo ช่อง input จะเป็นค่าว่าง
            username: 'zpao'
        });
        //ตัวแปล var username กับ this.setState({ username : '' }) ไม่ใช่ตัวเดียวกัน
        //console.log(username + ' xx ' + this.state.username);
        if (this.props.routeParams.playerOne) { //เช็คว่ามีค่าหรือไม่
            this.context.router.push({ // ทำการ router ไปยัง path /battle
                pathname: '/battle',
                query: {
                    playerOne: this.props.routeParams.playerOne,
                    playerTwo: this.state.username,
                }
            })
        } else {
            this.context.router.push('/playerTwo/' + this.state.username) // ทำการ router ไปยัง path /playerTwo
        }
    },

    render: function () {
        //console.log(this.props);
        return (
            <Prompt
                onSubmitUser={this.handleSubmitUser}
                onUpdateUser={this.handleUpdateUser}
                header={this.props.route.header}
                username={this.state.username} /> // Refactoring แยกโค้ดส่วน UI ไปไว้ที่ components ชื่อ Prompt.js โดยจะส่ง Func และ ตัวแปรไปด้วย
        )
    }
});

module.exports = PromptContainer;