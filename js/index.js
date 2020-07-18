let killCount = 0; //Primarily used to control when the boss shows up
let killTarget; //Used with killCount
let enemy; //Main enemy variable
let weapon = null; //Initially sets weapon state
let RandomCard; //Initializes "deck"
let killList = []; //Empty array for kill list once the action starts
let cardCount = 0;
let damage = 0;

let Main = {

    //This function initializes both the player and NPC settings
    startSettings: function (classType) {
        this.setCharacter(classType);
        this.setEnemies();
        this.BattleGround();
    },
    //This sets the player character   
    setCharacter: function (classType) {
        let getPlayer = document.querySelector(".hero");
        switch (classType) {
            case "Dutch":
                player = hero00;
                break;
            case "Douglas Quaid":
                player = hero01;
                break;
            case "Harry Tasker":
                player = hero02;
                break;
            case "John Matrix":
                player = hero03;
                break;
        }
        getPlayer.innerHTML = '<div class="hero"><h3>' + player.classType + '</h3><img src="img/' + player.NN + '.png" alt="Dutch"><p>' + player.DESC + '</p></div>';
    },
    //This sets the boss and minions
    setEnemies: function () {
        //Sets the initial kill count to zero
        killCount = 0;

        //Sets the boss and kill target
        let chooseRandomBoss = Math.floor(Math.random() * 5);
        switch (chooseRandomBoss) {
            case 0:
                boss = enemy00;
                killTarget = (boss.MIN + 1);
            break;
            case 1:
                boss = enemy01;
                killTarget = (boss.MIN + 1);
            break;
            case 2:
                boss = enemy02;
                killTarget = (boss.MIN + 1);
            break;
            case 3:
                boss = enemy03;
                killTarget = (boss.MIN + 1);
            break;
            case 4:
                boss = enemy04;
                killTarget = (boss.MIN + 1);
            break;
        } 
    },
    BattleGround: function () {
        weapon = noWeapon; //Sets default weapon to None
        cardCount = 0; //Sets action card count to zero
        let replaceStyleSheet = document.querySelector(".mainHeader");
        let replaceWholePage = document.querySelector(".wholePage");

        //Replaces the header information for the page
        replaceStyleSheet.innerHTML = (
        `<head class="mainHeader">
            <meta charset="utf-8">
            <title>Get to Da Choppa!</title>
            <link rel="stylesheet" href="battleground.css">
            <script src="js/index.js"></script>
            <script src="js/player.js"></script>
            <script src="js/enemy.js"></script>
            <script src="js/cards.js"></script>
        </head>`);
        
        //Replaces the entire body with new structure for battleground
        replaceWholePage.innerHTML = (
        `<body class="wholePage">
            <div class="bannerSection">
                <div class="bannerWrapper">
                    <a href="index.html">
                        <h2>Home</h2>
                    </a>
                    <h1>Brutal Battleground</h1>
                </div>
            </div>
            
            <!--This section holds the hero and action cards-->
            <div class="heroSection">
                <div class="heroWrapper">
                    <div class="heroCard">    
                        <a href="#" onclick="Main.mouseClickDesc()">
                            <div class="hero">
                                <img src="img/` + player.NN + `.png">
                                <h3>` + player.classType + `</h3>
                                <p>Health (HP): ` + player.HP + `</p>
                                <p>Strength (STR): ` + player.STR + `</p>
                                <p>Speed (SPD): ` + player.SPD + `</p>
                                <div id="weapon">
                                <p>Weapon: ` + weapon.cardName + `</p>
                                </div>
                            </div>
                        </a>
                    </div>
                <div class="actionCard1">
                    <a href="#" onclick="Main.refreshActionCard1()">
                        <div class="placeHolder">
                            <h2>Draw Card</h2>
                        </div>
                    </a>
                </div>

                <div class="actionCard2">
                    <a href="#" onclick="Main.refreshActionCard2()">
                        <div class="placeHolder">
                            <h2>Draw Card</h2>
                        </div>
                    </a>
                </div>
            </div>
            </div>
        
            <!--This section holds the action buttons-->
            <br>
            <div class="buttonSection">
                <div class="buttonWrapper">
                    <a href="#" onclick="Main.attackButton()">Attack</a>
                    <a href="#" onclick="Main.playCardOne()">Play Card</a>
                    <a href="#" onclick="Main.playCardTwo()">Play Card</a>
                </div>
            </div>

            <!--This section holds the enemy cards-->
            <div class="enemySection">
                <div class="enemyWrapper">    
                    <div class="tallyCard">
                        <h3>Kill Count: </h3>
                        <h4>` + killCount + `</h4>
                        <!--<h3>Kill Target: </h3>
                        <h4>` + killTarget + `</h4>-->
                    </div>

                    <div class="enemyCard">
                        <a href="#" onclick="Main.revealEnemyCard()">Reveal Enemy</a>
                    </div>

                    <div class="emptyCard">
                        <h3>Kill List</h3>
                        <p id="emptyID"></p>
                    </div>
                </div>
                
            </div>

        <footer class="footer"><p>Copyright &copy 2020 AngryAustrian Enterprises</p></footer>
        </body>`);
    },
    mouseClickDesc: function() {
        alert(player.DESC);
    },
    actionCardClick: function(cardOption) {

        //Checks what the card type is and displays a different set of stats depending on what it is
        if (cardCount >= 2) {
            alert('You cannot play more than two cards per round.');
        } else if (cardOption.cardType == 0) {
            alert('Card Type: Weapon\nPlay Phase: ' + cardOption.playPhase + '\nSPD: ' + cardOption.SPD + '\nDMG: ' + cardOption.die + 'd' + cardOption.DMG);
        } else if (cardOption.cardType == 2) {
            alert('Card Type: Action\nPlay Phase: ' + cardOption.playPhase + '\nDMG: ' + cardOption.DMG + '\nBonus: ' + cardOption.bonus);
        } else if (cardOption.cardType == 1) {
            alert('Card Type: Skill\nPlay Phase: ' + cardOption.playPhase + '\nHP: ' + cardOption.HP + '\nSTR: ' + cardOption.STR + '\nSPD: ' + cardOption.SPD);
        };
        
    },
    drawActionCard: function() {
        //Selects a random card from the "deck"
        let chooseRandomCard = Math.floor(Math.random() * 8);
        switch (chooseRandomCard) {
            case 0:
                RandomCard = skillCard01; //First Aid
            break;
            case 1:
                RandomCard = weaponCard01;
            break;
            case 2:
                RandomCard = weaponCard02;
            break;
            case 3:
                RandomCard = weaponCard03;
            break;
            case 4:
                RandomCard = actionCard01;
            break;
            case 5:
                RandomCard = weaponCard04;
            break;
            case 6:
                RandomCard = skillCard02; //Super Syrum
            break;
            case 7:
                RandomCard = skillCard01; //First Aid
            break;
        };
    },
    refreshActionCard1: function() {
        if (cardCount < 2) {
            this.drawActionCard();
            card = RandomCard;
            let getActionCard1 = document.querySelector(".actionCard1");
            getActionCard1.innerHTML = (`
            <div class="actionCard1">
                <a href="#" onclick="Main.actionCardClick(card)">
                <h3>` + card.cardName + `</h3>
                <img src="img/` + card.NN + `.png">
                <p>` + card.DESC + `</p>
                </a>
            </div>
            `);
        } else if (cardCount >= 2) {
            alert('You cannot play more than two cards per round.');
        };
    },
    refreshActionCard2: function() { 
        if (cardCount < 2) {
            this.drawActionCard();
            card2 = RandomCard;
            let getActionCard2 = document.querySelector(".actionCard2");
            getActionCard2.innerHTML = (`
            <div class="actionCard2">
                <a href="#" onclick="Main.actionCardClick(card2)">
                <h3>` + card2.cardName + `</h3>
                <img src="img/` + card2.NN + `.png">
                <p>` + card2.DESC + `</p>
                </a>
            </div>
            `);
        } else if (cardCount >= 2) {
            alert('You cannot play more than two cards per round.');
        };
    },
    playCardOne: function() {
        switch (card.cardType) {
            case 0: 
                weapon = card;
                this.refreshPlayerCard();
                this.resetPlaceholder1();
                card = null;
                cardCount++;
            break;
            case 1:
                if (weapon == noWeapon) {
                    player.HP = player.HP + card.HP;
                    player.STR = player.STR + card.STR;
                    player.SPD = player.SPD + card.SPD;
                    this.refreshPlayerCard();
                    this.resetPlaceholder1();
                } else {
                    player.HP = player.HP + card.HP;
                    player.STR = player.STR + card.STR;
                    player.SPD = player.SPD + card.SPD;
                    this.refreshPlayerCard();
                    this.resetPlaceholder1();
                };
                card = null;
                cardCount++;
            break;
            case 2:
                alert('This card has no effect.');
                this.resetPlaceholder1();
                cardCount++;
            break;
        };
    },
    playCardTwo: function() {
        switch (card2.cardType) {
            case 0: 
                weapon = card2;
                this.refreshPlayerCard();
                this.resetPlaceholder2();
                card2 = null;
                cardCount++;
            break;
            case 1:
                if (weapon == noWeapon) {
                    player.HP = player.HP + card2.HP;
                    player.STR = player.STR + card2.STR;
                    player.SPD = player.SPD + card2.SPD;
                    this.refreshPlayerCard();
                    this.resetPlaceholder2();
                } else {
                    player.HP = player.HP + card2.HP;
                    player.STR = player.STR + card2.STR;
                    player.SPD = player.SPD + card2.SPD;
                    this.refreshPlayerCard();
                    this.resetPlaceholder2();
                };
                card2 = null;
                cardCount++;
            break;
            case 2:
                alert('This card has no effect.');
                this.resetPlaceholder2();
                cardCount++;
            break;
        };
    },
    resetPlaceholder1: function() {
        let resetCard = document.querySelector(".actionCard1")
        resetCard.innerHTML = (`
            <div class="actionCard1">
                <a href="#" onclick="Main.refreshActionCard1()">
                    <div class="placeHolder">
                        <h2>Draw Card</h2>
                    </div>
                </a>
            </div>
        `);

    },
    resetPlaceholder2: function() {
        let resetCard = document.querySelector(".actionCard2")
        resetCard.innerHTML = (`
            <div class="actionCard2">
                <a href="#" onclick="Main.refreshActionCard2()">
                    <div class="placeHolder">
                        <h2>Draw Card</h2>
                    </div>
                </a>
            </div>
        `);

    },
    loadMinion: function() {
        //Chooses random minion if minion count is not zero
        let chooseRandomMinion = Math.floor(Math.random() * 8); //This number will change based on how many minions are available in the switch statement
        switch (chooseRandomMinion) {
            case 0:
                minion = enemy10;
            break;
            case 1:
                minion = enemy11;
            break;
            case 2:
                minion = enemy12;
            break;
            case 3:
                minion = enemy13;
            break;
            case 4:
                minion = enemy14;
            break;
            case 5:
                minion = enemy15;
            break;
            case 6:
                minion = enemy16;
            break;
            case 7:
                minion = enemy17;
            break;
            case 8:
                minion = enemy18;
            break;
        };
        //Insert logic here to ensure minion does not have negative health
    },
    revealEnemyCard: function() {
        
        //Checks victory condition
        if (killCount == killTarget) {
            this.loadVictoryScreen();
        } else if ((killTarget - killCount) > 1) {
            //If Kill Target has not been reached, sets enemy variable to "minion"
            this.loadMinion(); //Loads minion
            while (minion.HP <= 0){ //Loops until it finds a minion with positive health
                this.loadMinion();
            };
            enemy = minion; //Assigns minion to enemy variable
        } else {
        //Sets enemy variable to be the Boss
        enemy = boss;
        };
        this.refreshEnemyCard();
    },
    
    //This section contains the main game logic
    attackButton: function() {
        cardCount = 0;
        while (killCount < killTarget) 
        { 
            if (player.HP > 0 && enemy.HP > 0)
            {
                if (enemy.SPD >= player.SPD) { //If enemy is faster
                    alert(enemy.NN + ' strikes first for ' + enemy.STR + ' damage!');
                    this.enemyAttack();
                    if (player.HP <= 0) {
                        this.loadDefeatScreen();
                        break;
                    } else {
                        this.playerAttack();
                        if (enemy.HP <= 0) {
                            if (killTarget == 1) {
                                killCount++;
                            } else if (killTarget > 1) {
                                this.refreshKillCount();
                            };
                            if (killCount == killTarget){
                                this.loadVictoryScreen();
                            } else {
                                this.refreshPlayerCard();
                                this.revealEnemyCard();
                                break;
                            };
                        };
                        break;
                    };
                } else { //If player is faster
                    this.playerAttack();
                    if (enemy.HP <= 0) {
                        if (killTarget == 1) {
                            killCount++;
                        } else if (killTarget > 1) {
                            this.refreshKillCount();
                        };
                        if (killCount == killTarget){
                            this.loadVictoryScreen();
                        } else {
                            this.refreshPlayerCard();
                            this.revealEnemyCard();
                            break;
                        };

                    } else {
                        alert(enemy.NN + ' strikes you for ' + enemy.STR + ' damage!')
                        this.enemyAttack();
                        if (player.HP <= 0) {
                            this.loadDefeatScreen();
                            break;
                        };
                        break;
                    };
                };

            } else if (player.HP <= 0){
                this.loadDefeatScreen();
                break;
            } else {
                break;
            };

        };
        if (killCount == killTarget) {
            this.loadVictoryScreen();
        };
    },
    //These two refresh the DOM view so you can see changes in the variable state (e.g. when you or the enemy lose HP)
    refreshPlayerCard: function() {
        let refreshPlayerCard = document.querySelector(".heroCard");
        refreshPlayerCard.innerHTML = (`
        <div class="heroCard">    
            <a href="#" onclick="Main.mouseClickDesc()">
                <div class="hero">
                    <img src="img/` + player.NN + `.png">
                    <h3>` + player.classType + `</h3>
                    <p>Health (HP): ` + player.HP + `</p>
                    <p>Strength (STR): ` + player.STR + `</p>
                    <p>Speed (SPD): ` + player.SPD + `</p>
                    <div id="weapon">
                        <p>Weapon: ` + weapon.cardName + `</p>
                    </div>
                </div>
            </a>
        </div>
        `);
    },
    refreshEnemyCard: function() {
        let refreshEnemyCard = document.querySelector(".enemyCard");
        refreshEnemyCard.innerHTML = (`
                <div class="enemyCard">
                    <div id="enemyCard">
                    <img src="img/` + enemy.fileName + `.png">
                    <h3>` + enemy.NN + `</h3>
                    <div id="enemyCardInside">
                    <p>Health (HP): ` + enemy.HP + `</p>
                    <p>Strength (STR): ` + enemy.STR + `</p>
                    <p>Speed (SPD): ` + enemy.SPD + `</p>
                    </div>
                    </div>
                </div>
        `);
    },
    loadDefeatScreen: function() {
        let defeatScreen = document.querySelector(".wholePage");
        defeatScreen.innerHTML = (`
            <body class="wholePage">
                <div class="defeatSection">
                    <div class="defeatWrapper">
                    <h1>Defeat...</h1>
                    <img src="img/defeat.png">
                    <p>You, the most manly of men or most girly of women, have been utterly crushed by your enemies. Da choppa did not wait for you.</p>
                    <a href="index.html">Play Again</a>
                    </div>
                </div>
            <footer class="footer"><p>Copyright &copy 2020 AngryAustrian Enterprises</p></footer>
            </body>  
        `);
    },
    loadVictoryScreen: function() {
        let victoryScreen = document.querySelector(".wholePage");
        victoryScreen.innerHTML = (`
            <body class="wholePage">
                <div class="victorySection">
                    <div class="victoryWrapper">
                        <h1>Victory!</h1>
                        <img src="img/victory.png">
                        <p>You, the most manly of men or most girly of women, have beaten the incredible odds and won the day. Bravo. Now GET TO DA CHOPPA!!!</p>
                        <a href="index.html">Play Again</a>
                    </div>
                </div>
            <footer class="footer"><p>Copyright &copy 2020 AngryAustrian Enterprises</p></footer>
            </body>
            `);
    },
    refreshKillCount: function() {
        killCount++;
        let tallyCard = document.querySelector(".tallyCard");
        tallyCard.innerHTML = (`
        <div class="tallyCard">
            <div>
            <h3>Kill Count</h3>
            <h4>` + killCount + `</h4>
            </div>
            <!--<div>
            <h3>Kill Target: </h3>
            <h4>` + killTarget + `</h4>
            </div>-->   
        </div>
        `);
        this.refreshKillList();
    },
    refreshKillList: function() {
        //Clears current kill list HTML so list doesn't stack up against previous list
        let emptyEmptyCard = document.querySelector("#emptyID");
        emptyEmptyCard.innerHTML = (`<p id="emptyID"></p>`)

        //Defines function for list iteration of Kill List
        function updateKills(item) {
            let updateKillsVar = document.querySelector("#emptyID");
            updateKillsVar.innerHTML += (`<p>` + item + `</p>`);
        };
        
        //Adds current minion name to kill list
        killList.push(minion.NN);
        
        //Iterates through kill list
        killList.forEach(updateKills);
    },
    enemyAttack: function() {
        player.HP = player.HP - enemy.STR;
        this.refreshPlayerCard();
    },
    playerAttack: function() {
        if(weapon == noWeapon) {
            enemy.HP = enemy.HP - player.STR;
            alert('You strike ' + enemy.NN + ' for ' + player.STR + ' damage!');
            this.refreshEnemyCard();
            this.refreshPlayerCard();
        } else {
            this.damageCalculator();
            enemy.HP = enemy.HP - (player.STR + damage);
            alert('You strike ' + enemy.NN + ' with your ' + weapon.cardName + ' for ' + (player.STR + damage) + ' damage!');
            this.refreshEnemyCard();
            this.refreshPlayerCard();
            damage = 0;
        };
    },
    //This takes the die and damage from your equipped weapon and calculates the overall damage based on the die "roll"
    damageCalculator: function() {
        var i;
        for (i=0; i < weapon.die; i++) {
            let rollDie = Math.floor(Math.random() * weapon.DMG) + 1;
            damage = damage + rollDie;
        };
        console.log(damage); //Console logged just for funzies
    }

    
}