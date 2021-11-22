const express = require('express')
const path = require('path')
const app = express()

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const port = 3000
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})

app.get('/teams/:teamName', function (request, response) {
    
    const myTeam = request.params.teamName
    const myTeamId = teamToIDs[myTeam]
    //const teamName = request.params.teamName

    var urllib = require('urllib');

    urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (err, data, res) {
        if (err) {
          throw err; // you need to handle error
        }
        const teamData = data.toString()
        const jsonData = JSON.parse(teamData)
        //console.log(jsonData);

        const matchingTeamName = (t) => ( t.teamId === myTeamId)
        let allPlayers = jsonData.league.standard.filter(matchingTeamName)
        let finalTeam = allPlayers.splice(0,6)

        const finalTeamInfo = finalTeam.map((player) => {
            return {
                firstName: player.firstName,
                lastName: player.lastName,
                jersey: player.jersey,
                position: player.pos
            }
        })
        response.send(finalTeamInfo)
    });
    
})