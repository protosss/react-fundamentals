// app/utils/githubHelpers.js
var axios = require('axios');

var id = "8c4a9bf81d13dbefaaef";
var sec = "4fa557f1fb01414ea57bafc9f2dd7c5c4ff7c08f";
var param = "?client_id=" + id + "&client_secret=" + sec;

function getUserInfo(username) { //สร้าง Function โดยใช้คำสั่ง Axios เพื่อดึงข้อมูลจาก API Website Github
    return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos(username) {
    return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

function getTotalStars(repos) {
    return repos.data.reduce(function (prev, current) {
        return prev + current.stargazers_count
    }, 0)
}

function getPlayersData(player) {
    return getRepos(player.login)
        .then(getTotalStars)
        .then(function (totalStars) {
            return {
                followers: player.followers,
                totalStars: totalStars
            }
        })
}


function calculateScores(players) {
    return [
        players[0].followers * 3 + players[0].totalStars,
        players[1].followers * 3 + players[1].totalStars
    ]
}

var helpers = {
    getPlayersInfo: function (players) {
        // ดึงข้อมูล userจาก Github มาใช้
        return axios.all(players.map(function (username) { //axios.all คือฟังก์ชั่นที่ใช้สำหรับ call promises array กล่าวคือ                                                          จะมีการ call function ที่เป็น promises หลายๆ ตัวพร้อมๆ กัน
            return getUserInfo(username)
        }))
            .then(function (info) { //เมื่อมีการทำงาน Function ข้างบนเสร็จจะทำงานใน .then ต่อ
                return info.map(function (user) { //ทำการเรียกฟังก์ชั่น map กับ info ซึ่งเป็น return ของ axios.all                                                   จากนั้นก็ทำการ “แปลงสภาพ” array info ให้เก็บเฉพาะส่วนของ data (หรือข้อมูลจาก                                     github user) เท่านั้น
                    return user.data
                })
            })
            .catch(function (err) { console.warn('Error in getPlayersInfo: ', err) }) //เป็นคำสั่งดัก Error ถ้า Error                                                                                        ให้แสดงคำสั่งที่ระบุไว้
    },
    battle: function (players) {
        var playerOneData = getPlayersData(players[0]);
        var playerTwoData = getPlayersData(players[1]);
        return axios.all([playerOneData, playerTwoData])
            .then(calculateScores)
            .catch(function (err) { console.warn('Error in getPlayersInfo: ', err) })
    }
};

module.exports = helpers;