var player_data = [
    {
        "playerRank": 1,
        "playerName": "Mohamed Salah ",
        "playerClub": "Liverpool",
        "playerGoals": 10
    },
    {
        "playerRank": 2,
        "playerName": "Jamie Vardy",
        "playerClub": "Leicester City",
        "playerGoals": 7
    },
    {
        "playerRank": 3,
        "playerName": "Michail Antonio",
        "playerClub": "West Ham United",
        "playerGoals": 6
    },
    {
        "playerRank": 4,
        "playerName": "Sadio Mané",
        "playerClub": "Liverpool",
        "playerGoals": 6
    },
    {
        "playerRank": 5,
        "playerName": "Bruno Fernandes",
        "playerClub": "Manchester United",
        "playerGoals": 5
    },
    {
        "playerRank": 6,
        "playerName": "Cristiano Ronaldo",
        "playerClub": "Manchester United",
        "playerGoals": 4
    },
    {
        "playerRank": 7,
        "playerName": "Son Heung Min",
        "playerClub": "Spurs",
        "playerGoals": 4
    },
    {
        "playerRank": 8,
        "playerName": "Ismaila Sarr",
        "playerClub": "Watford",
        "playerGoals": 4
    },
    {
        "playerRank": 9,
        "playerName": "Maxwel Cornet",
        "playerClub": "Burnley",
        "playerGoals": 4
    },
   /* {
        "playerRank": 10,
        "playerName": "Neil",
        "playerClub": "Brighton",
        "playerGoals": 3
    },
    */
]

var loaded_items = [] 


function printPlayers(playerData){
    playerData.forEach(player => {
        console.log(player)
    });
}

function calculateNewRankings(playerData, newPlayer){
    // return the old player data that has new rankings with this new player added

    // additional check if they exist
    var index = playerData.findIndex(x => x.playerName==newPlayer.playerName); 
    index === -1 ? playerData.push(newPlayer) : alert("Player / Player Name Already Exists")

    console.log('Added New Player To List')
    printPlayers(playerData)

    // sort this list of nested dictionary/object data
    // smallest to biggest is a-b, reverse is what we want
    playerData = playerData.sort(function(a, b) {
        return b.playerGoals - a.playerGoals;
    });
    console.log('Player Order Now Sorted')
    printPlayers(playerData)

    console.log('Now Setting Ranking')
    // new ranks set
    playerData.forEach(player => {
        // reason why with unique name needed
        player.playerRank = playerData.findIndex(x => x.playerName === player.playerName)+1
    });

    return playerData
}

function mainPlayerClickLoadingLogic(){
    $('.main_body').click(function(e) {
        // document or this div clicked
        console.log('Event ID: ' + e.target.id)
        console.log("Document Clicked")

        // logic here    
        $.each(player_data, function(i, player) {
            try {                
                // re order the player list 
                // if we havent loaded all our data 
                if (!loaded_items.includes(player)){    
                    console.log("Still More Data To Load")
                    // get the next item in the player data list
                    console.log(player)
                    loaded_items.push(player);
                    img_name=player.playerClub.replace(/\s+/g,"_");
                    console.log("Image Name:\t"+img_name)
                    var p_text =  player.playerName + "\t\t" + player.playerGoals
                    console.log(p_text)
                    // inline dynamic style tpo add player club logo to li item 
                    $('#playerUl').append('<li style="background: url(../images/club_logos/'+img_name+'.svg) no-repeat left top ;"><p id="rank_'+player.playerRank+'" class="playerListItem">'+p_text+'</p></li>');
                    animateItemList()
                    // break out of this loop
                    return false; 
                }
                else{
                    console.log("exits in list = loaded alreeady")
                }
            } catch (error) {
                console.log(error)
            }
            clearAddPlayerInputs()
          });
      }
      );
}

// like a main function
$(document).ready(function(){      
    console.log("Page Loaded")
    $(".page_header_banner").css("border", "3px solid white");
    mainPlayerClickLoadingLogic()        
    addPlayerLogic()
    footerLogic()
});

function footerLogic(){
    $("#fixed-form-container .body").hide();
    $("#fixed-form-container .button").click(function () {
            $(this).next("#fixed-form-container div").slideToggle(400);
            $(this).toggleClass("expanded");
        });
}

function findPlayerIndexByPlayerName(playerName){
    // validation forced player name to be the unique look up of this project
    // value will only ever be positive
    return player_data.findIndex(x => x.playerName==playerName);
}

function animateItemList(){
    // any and all items of type li are given this extra styling class and delay occurs
    $("li").delay(500).each(function(i) {
        $(this).delay(100 * i).queue(function() {
          $(this).addClass("show");
        })
      })
}

function addPlayerLogic(){
    $("#btnAddPlayer").click(function(){
        console.log('Button "Add Player" Clicked')
        var player_name = $(".player_name").val();
        var player_club = $(".player_club").val();
        var player_goals = $(".player_goals").val();

        if ((player_name == '') || (player_club == '') || (player_goals == '')){
            alert("Some Player Data Is Missing !")
        }
        else if ($.isNumeric(parseInt(player_goals)) == false){
            alert("Player Goals Must Be A Numeric Value !")
        }
        else{
            // continue for now
            player_data = calculateNewRankings(player_data, {
                "playerName": player_name,
                "playerClub": player_club,
                "playerGoals": player_goals
            })
            // now clear and load list up to number of people we were at ie. size of loaded list 
            printPlayers(player_data)
            
            // remove all the displayed items on the screen 
            loaded_items.forEach(element => {
                $('#playerUl').empty();
            });

            // we now need to slot in out items based on the new ordered list
            // this means we print all in the new order but up to the last that was displayed before 
            if (loaded_items.length){
                // popping player object out as we know its going to get cleared
                var previous_last_player_name = loaded_items.pop().playerName
                console.log('Previous Last Loaded Player:\t'+previous_last_player_name)

                var current_index_of_last_loaded_player = findPlayerIndexByPlayerName(previous_last_player_name)
                console.log('Their New Current Index Position:\t'+current_index_of_last_loaded_player)

                // clear the old array of loaded items as this is about to be updated 
                loaded_items = [];
                console.log('(expecting []) Loaded Items:\t'+loaded_items)

                 // if the item is not in the loaded_items list it will appear 
                 // have to use index as player object access is unreliable for order at this point
                for(let i=0; i<=current_index_of_last_loaded_player; i++){
                    try {                        
                        console.log('Index:\t'+i)
                        var player = player_data[i]
                        console.log('Loading Player:\t'+player.playerName)

                        if (!loaded_items.includes(player)){
                            loaded_items.push(player);
                            img_name=player.playerClub.replace(/\s+/g,"_");

                            var p_text =  player.playerName + "\t\t" + player.playerGoals
                            console.log(p_text)

                            $('#playerUl').append('<li style="background: url(../images/club_logos/'+img_name+'.svg) no-repeat left top ;"><p id="rank_'+player.playerRank+'" class="playerListItem">'+p_text+'</p></li>');
                            animateItemList()
                            if (player.playerName == previous_last_player_name){
                                return false;
                            }
                        }
                    } catch (error) {
                        console.log(error)
                    }
                };
                // clear the label input text 
                clearAddPlayerInputs()
            }
            else{
                // nothing was even loaded yet
                console.log('Nothing Was Previously Loaded')
                clearAddPlayerInputs()
            }

        }

    });
}

function clearAddPlayerInputs(){
    $(".player_name").val('');
    $(".player_club").val('');
    $(".player_goals").val('');
}