// app/components/UserDetails.js
var React = require('react');
var PropTypes = React.PropTypes

function UserDetails(user) {
    return (
        <div>
            {!!user.score && <li className="list-group-item"><h3>Score: {user.score}</h3></li>}
            <li className="list-group-item"> <img src={user.info.avatar_url} className="img-rounded img-responsive" /></li>
            {user.info.name && <li className="list-group-item">Name: {user.info.name}</li>}
            <li className="list-group-item">Username: {user.info.login}</li>
            {user.info.location && <li className="list-group-item">Location: {user.info.location}</li>}
            {user.info.company && <li className="list-group-item">Company: {user.info.company}</li>}
            <li className="list-group-item">Followers: {user.info.followers}</li>
            <li className="list-group-item">Following: {user.info.following}</li>
            <li className="list-group-item">Public Repos: {user.info.public_repos}</li>
            {user.info.blog && <li className="list-group-item">Blog: <a href={user.info.blog}> {user.info.blog}</a></li>}
        </div>//!!user.score เป็นการแปลง operator ของ javascript ให้เป็น boolean ส่วน && เป็นคำสั่งเช็คค่า true false ถ้า user.score = true ให้แสดง <li .....> </li>
    )
}

UserDetails.propTypes = {
    score: PropTypes.number,
    info: PropTypes.shape({
        avatar_url: PropTypes.string.isRequired,
        blog: PropTypes.string,
        company: PropTypes.string,
        followers: PropTypes.number.isRequired,
        following: PropTypes.number.isRequired,
        location: PropTypes.string,
        login: PropTypes.string.isRequired,
        name: PropTypes.string,
        public_repos: PropTypes.number.isRequired,
    })
    // props ที่เป็น nested props ที่ซ้อนอยู่ภายใต้ props อื่นๆ อีกชั้นหนึ่งนั้น สามารถระบุได้โดยใช้ PropTypes.shape ได้ ทำให้เราสามารถเห็นได้อย่างชัดเจนว่า component ตัวนี้รับ props อะไรมาบ้าง
}

module.exports = UserDetails;