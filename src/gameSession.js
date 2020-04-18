Array.prototype.randomItem = function () {
  return this[Math.floor(Math.random() * this.length)]
}


if (!Array.prototype.findIndices) {
  Array.prototype.findIndices = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.findIndices called on null or undefined')
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function')
    }
    let list = Object(this),
      length = list.length >>> 0,
      thisArg = arguments[1],
      value
    let a = []
    for (let i = 0; i < length; i++) {
      value = list[i]
      if (predicate.call(thisArg, value, i, list)) {
        a.push(i)
      }
    }
    
    return a.length === 0 ? -1 : a
  }
}

export default class GameSession {
  
  constructor(playerName1, playerName2) {
    this.board = [
      ' ', ' ', ' ',
      ' ', ' ', ' ',
      ' ', ' ', ' ',
    ]
    // "1" means winning position
    this.winCases = /(^111......$)|(^...111...$)|(^......111$)|(^1..1..1..$)|(^.1..1..1.$)|(^..1..1..1$)|(^1...1...1$)|(^..1.1.1..$)/g
    
    this.player1 = {
      name: playerName1,
      sign: 'X',
      move: () => this.bot(playerName1)
    }
    
    this.player2 = {
      name: playerName2,
      sign: 'O',
      move: () => this.bot(playerName2)
    }
    
    // Move number
    this.i = 1
    
    // Player1 goes first
    this.player = this.player1
    this.player1.move()
  }
  
  bot (playerName) {
    switch (this.typeOfPlayer(playerName)) {
      case 'random':
        return this.botRandomMove()
      case 'minimax':
        return this.botMinimaxMove()
      case 'human':
        console.info(playerName,'is human')
    }
  }
  
  typeOfPlayer (playerName) {
    let n = playerName.toLowerCase()
    return n.indexOf('random') >= 0 ? 'random' :
           n.indexOf('minimax') >= 0 ? 'minimax' : 'human';
  }
  
  changePlayer() {
    this.i++
    this.player = this.i % 2 ? this.player1 : this.player2
  }
  
  isPlayerWon(board=this.board, sign=this.player.sign, winCases=this.winCases) {
    // Board => Mask
    let mask = board.join('').replace(new RegExp(sign, 'g'), '1')
    // To check mask with winning cases
    return mask.search(winCases) === 0
  }
  
  congratulation(){
    // Good job!
    // this.winner = this.player
  }
  
  renderMove () {
  
  }
  
  renderChangePlayer () {
  
  }
  
  afterMove() {
    this.renderMove()
    if (this.isPlayerWon()){
      this.congratulation()
    }
    else {
      this.changePlayer()
      this.renderChangePlayer()
      // Next Move
      this.player.move()
    }
  }
  
  
  availableSpots (board=this.board) {
    return board.findIndices(s => s === ' ')
  }
  
  
  humanMove(i) {
    this.board[i] = this.player.sign
    this.afterMove()
  }
  
  async botRandomMove() {
    await this.sleep(600)
    let spot = this.availableSpots().randomItem()
    this.board[spot] = this.player.sign
    this.afterMove()
  }
  
  async botMinimaxMove() {
    await this.sleep(600)
    let spot = this.minimax(this.board, this.player)
    this.board[spot] = this.player.sign
    this.afterMove()
  }
  
  minimax(board, player) {
    let moves = []
    let emptySpots = this.availableSpots(board)
    for (let i = 0; i < emptySpots; i++){
      let move = {
        index: board[emptySpots[i]]
      }
      
    }
  }
  
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// class Player {
//   constructor({name, sign}, m) {
//     this.name = name
//     this.sign = sign
//     this.move = m
//   }
//
//   move(afterMove) {
//     console.log('default move')
//     afterMove()
//   }
// }


// export const gameSession = (playerName1, playerName2) => ({
//   board: [
//     ' ', ' ', ' ',
//     ' ', ' ', ' ',
//     ' ', ' ', ' ',
//   ],
//   player1: {
//     name: playerName1,
//     sign: 'X'
//   },
//   player2: {
//     name: playerName2,
//     sign: 'O'
//   },
//
// })