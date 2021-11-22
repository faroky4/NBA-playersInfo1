class APIManagre {
    constructor() {
        this.data = {}
    }

    getTeamInfo(name) {

        $.get(`teams/${name}`, function (teamInfo) {
            this.data = teamInfo
            
            let html = ''
            for(let player of this.data) {
                html += `<div id="player-info">
                            <span id="name"> ${player.firstName} ${player.lastName}</span>
                            <div> ${player.jersey} </div>
                            <img>
                            <div>${player.position} </div>  
                        </div>`
            }

            $('#team-info').append(html)
        })
    }
}