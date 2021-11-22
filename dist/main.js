const APIMan = new APIManagre()

$('#get-roster').on('click',function(){

    const team = $('#team-input').val()
    APIMan.getTeamInfo(team)
    
})