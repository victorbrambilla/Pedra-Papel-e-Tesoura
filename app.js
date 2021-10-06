const express = require('express')
const app = express()
app.use(express.json())
const port = 3000
const cors = require('cors')

app.use(express.static('www'));
app.use(cors())

const game = []

app.get('/game', (req, res) => {
  res.json(game)
  
})

app.post('/game', (req, res) => {

    
    computerScore=req.body.computerScore
    playerScore=req.body.playerScore
    const computerChoise = Math.round(Math.random() * 2) + 1;
    playerChoice= req.body.playerChoice

    if ((playerChoice == 1) && (computerChoise == 1)) {
        winner = 0;
    }
    else if ((playerChoice == 1) && (computerChoise == 2)) {
        winner = 2;
    }
    else if ((playerChoice == 1) && (computerChoise == 3)) {
        winner = 1;
    }
    else if ((playerChoice == 2) && (computerChoise == 1)) {
        winner = 1;
    }
    else if ((playerChoice == 2) && (computerChoise == 2)) {
        winner = 0;
    }
    else if ((playerChoice == 2) && (computerChoise == 3)) {
        winner = 2;
    }
    else if ((playerChoice == 3) && (computerChoise == 1)) {
        winner = 2;
    }
    else if ((playerChoice == 3) && (computerChoise == 2)) {
        winner = 1;
    }
    else if ((playerChoice == 3) && (computerChoise == 3)) {
        winner = 0;
    }

    

    res.json({winner,
    computerChoise
    
    })
    
    game.push({
        winner,
        computerChoise
        
    })
    
    
})


app.delete('/game', (req, res) => {
   
    for(let i in game){
        game.splice(i)
    }

    res.json({message:'anotacaoçao excluida '})
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})