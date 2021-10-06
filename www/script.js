playerScore=0
computerScore=0
function play(jogada){

    let rounds=$('#rounds').val()
    
    if(rounds){
        document.querySelector('#rounds').classList.add("displayNone")

        //atualizador de informações
        $.ajax({
            type: 'post',
            url: '/game',
            data: JSON.stringify({playerChoice: jogada}),
            contentType: "application/json; charset=utf-8",
            
            success: function (data) {
                document.querySelector('#imgPc').innerHTML=''
                console.log(data)
                
                if(data.computerChoise===1){
                    document.querySelector('#imgPc').setAttribute('src', 'images/pedra.png')
                }else if (data.computerChoise===2){
                    document.querySelector('#imgPc').setAttribute('src', 'images/papel.png')
    
                }else if(data.computerChoise===3){
                    document.querySelector('#imgPc').setAttribute('src', 'images/tesoura.png')
    
                }
                
                if(data.winner===1){
                    document.querySelector('#winner').innerHTML="Você ganhou a rodada!!"
                    playerScore++
                    document.querySelector('#playerscore').innerHTML=`: ${playerScore}`
                }else if(data.winner===2){
                    document.querySelector('#winner').innerHTML="Você perdeu a rodada!!"
                    document.querySelector('#computerscore').innerHTML=`: ${computerScore}`
                    computerScore++
                }else if (data.winner===0){
                    document.querySelector('#winner').innerHTML="Empatou!!"
                }
       
            },
           
        });
        
        //contagem de rodadas
        $.ajax({
            type: 'get',
            url: '/game',
            
            contentType: "application/json; charset=utf-8",
            
            success: function (data) {
                
                const rodada= data.length
                document.querySelector('.round').innerHTML=`Rodada: ${rodada}`
            
                if(rodada==rounds){
                    finish()
                }
      
            },
          
        });
        
        //finalização da partida
        function finish(){

            setTimeout(function(){
                if(playerScore>computerScore){
                    document.querySelector('.out').style.display='none'
                    document.querySelector('#winner').innerHTML="<h1>Você ganhou a Partida</h1><br> <a href='' class='button'>Jogar novamente</a>"
                }else if(playerScore>computerScore){
                    document.querySelector('.out').style.display='none'
                    document.querySelector('#winner').innerHTML="<h1>Você perdeu a Partida</h1><br> <a href='' class='button'>Jogar novamente</a>"
                }else{
                    document.querySelector('.out').style.display='none'
                    document.querySelector('#winner').innerHTML="<h1>Partida Empatada</h1><br> <a href='' class='button'>Jogar novamente</a>"
                }
                
                del()

            }, 700)

        }

        //apagar os dados
        function del(){
            $.ajax({
                type: 'delete',
                url: '/game',
                
                contentType: "application/json; charset=utf-8",
                
                success: function (data) {
                    
                },
            });
        }
    }else{
        alert("Digite o número de rodadas")
    }
    
    
  
    

    
}
    

