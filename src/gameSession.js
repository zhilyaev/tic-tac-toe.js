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
    
    return a.length === 0 ? [] : a
  }
}


export default class GameSession {
  
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
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
    console.info('=======================================')
    console.info('Новый ход:', this.i)
    console.info(playerName,'ходи!')
    switch (this.typeOfPlayer(playerName)) {
      case 'random':
        return this.botRandomMove()
      case 'minimax':
        return this.botMinimaxMove()
      case 'human':
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
  
  isSignWon(board=this.board, sign=this.player.sign, winCases=this.winCases) {
    // Board => Mask
    let mask = board.join('').replace(new RegExp(sign, 'g'), '1')
    // To check mask with winning cases
    return mask.search(winCases) === 0
  }
  
  whoIsWon(board){
    return this.isSignWon(board, this.player1.sign)
      ? this.player1
      : this.isSignWon(board, this.player2.sign)
        ? this.player2
        : this.availableSpots().length === 0
          ? 'nobody' : 'continue'
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
    if (this.isSignWon()){
      console.info('************************************')
      console.info(`${this.player.name} побеждает!`)
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
  
  humanMove(i){
    this.move(i)
  }
  
  renderSpotIsBusy() {
  
  }
  
  move(index, player = this.player, board = this.board) {
    if (this.availableSpots(board).includes(index)){
      console.info(`${player.name} занимает ${index+1}-ую клетку`)
      board[index] = player.sign
      this.afterMove()
    } else {
      console.info(`${player.name} ${index+1}-ая клетка занята. Попробуй другую.`)
      this.renderSpotIsBusy()
    }
  }
  async botRandomMove() {
    await this.sleep(500)
    console.info(`${this.player.name} ходит случайно`)
    let index = this.availableSpots().randomItem()
    this.move(index)
  }
  async botMinimaxMove() {
    // Если все клетки пустые, то ходи рандомно
    if (this.availableSpots().length === 9){
      await this.botRandomMove()
    }
    // Если центральная клавиша занята и бот ходит вторым
    else if (this.availableSpots().length === 8 && this.board[4] !== ' '){
      // Выбрать случайный угол
      console.info(`${this.player.name} занимает случайный угол`)
      let i = [0,2,6,8].randomItem()
      this.move(i)
    }
    else {
      console.info(`${this.player.name} ходит по-минимаксу`)
      let {index} = this.minimax(this.board, this.player)
      this.move(index)
    }
  }
  
  getOpponentFor(player){
    return player === this.player1 ? this.player2 : this.player1;
  }
  
  minimaxReturnScore(board) {
    let winner = this.whoIsWon(board)
    switch (winner) {
      case 'nobody':
        return {score: 0}
      case 'continue':
        return 'continue'
      default:
        switch (this.typeOfPlayer(winner.name)) {
          case 'minimax':
            return {score:  1}
          default:
            return {score: -1}
        }
    }
  }
  
  
  minimax(newBoard, player, depth) {
    let returnScore = this.minimaxReturnScore(newBoard)
    if (returnScore !== 'continue') return returnScore
    
    let moves = this.minimaxMoves(newBoard, player, depth)
    
    return this.minimaxBestMove(moves, player)
  }
  
  minimaxMoves(newBoard, player, depth) {
    let moves = []
    for (let i of this.availableSpots(newBoard)){
      let move = {}
      move.index = i
      newBoard[i] = player.sign
      move.score = this.minimax(newBoard, this.getOpponentFor(player), depth+1).score
      newBoard[i] = ' '
      moves.push(move)
    }
    return moves
  }
  
  minimaxBestMove(moves, player) {
    let bestMove;
    if(this.typeOfPlayer(player.name)==='minimax'){
      let bestScore = -10000;
      for(let i = 0; i < moves.length; i++){
        if(moves[i].score > bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    
    return moves[bestMove]
  }
  
}