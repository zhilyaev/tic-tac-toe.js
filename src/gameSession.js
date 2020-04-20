/**
 * There is the simple way for make sleep(ms) in JS
 * @param {int} ms
 * @returns {Promise<unknown>}
 */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Get Random value from array
 * @returns {*}
 */
Array.prototype.randomItem = function () {
  return this[Math.floor(Math.random() * this.length)]
}


if (!Array.prototype.findIndices) {
  /**
   * @returns {Array}
   * @param predicate
   */
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
  /**
   * There is create new Game for TicTacToe
   * Auto-start game if player1 is somebody bot
   * @param playerName1
   * @param playerName2
   */
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
  
  /**
   * Get free spots of a board
   * @param board
   * @returns {Array}
   */
  availableSpots (board=this.board) {
    return board.findIndices(s => s === ' ')
  }
  
  /**
   * This function will be call every time before somebody player move
   * Also this function set move function for bot
   * @param playerName
   * @returns {Promise<void>}
   */
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
  
  /**
   * Return type of Player between [random, minimax, human]
   * @param playerName
   * @returns {string}
   */
  typeOfPlayer (playerName) {
    let n = playerName.toLowerCase()
    return n.indexOf('random') >= 0 ? 'random' :
           n.indexOf('minimax') >= 0 ? 'minimax' : 'human';
  }
  
  /**
   * Next Player
   */
  changePlayer() {
    this.i++
    this.player = this.i % 2 ? this.player1 : this.player2
  }
  
  /**
   * Did this character win?
   * @param board
   * @param sign
   * @param winCases
   * @returns {boolean}
   */
  isSignBeneficial(board=this.board, sign=this.player.sign, winCases=this.winCases) {
    // Board => Mask
    let mask = board.join('').replace(new RegExp(sign, 'g'), '1')
    // To check mask with winning cases
    return mask.search(winCases) === 0
  }
  
  /**
   * Who won? - player1 or player2 or nobody or continue?
   * @param board
   * @returns {*}
   */
  whoWon(board){
    return this.isSignBeneficial(board, this.player1.sign)
      ? this.player1
      : this.isSignBeneficial(board, this.player2.sign)
        ? this.player2
        : this.availableSpots().length === 0
          ? 'nobody' : 'continue'
  }
  
  /**
   * This function will be call every time  when some of the players finish his move
   */
  afterMove() {
    this.renderMove()
    if (this.isSignBeneficial()){
      console.info('************************************')
      console.info(`${this.player.name} побеждает!`)
      this.renderCongratulation()
    }
    else if(this.availableSpots().length === 0){
      console.info('************************************')
      console.info('Никто не выиграл')
      this.renderNoOneWon()
    }
    else {
      this.changePlayer()
      this.renderChangePlayer()
      // Next Move
      this.player.move()
    }
  }
  
  getOpponentFor(player){
    return player === this.player1 ? this.player2 : this.player1;
  }
  
  /**
   * Human is making a move
   * @param {number} i
   */
  humanMove(i){
    this.move(i)
  }
  
  /**
   * Base function for all player
   * @param index
   * @param player
   * @param board
   */
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
  
  
////////////////////////////////////////////////////////////
//                                                        //
//     RRRRRR  EEEEEEE NN   NN DDDDD   EEEEEEE RRRRRR     //
//     RR   RR EE      NNN  NN DD  DD  EE      RR   RR    //
//     RRRRRR  EEEEE   NN N NN DD   DD EEEEE   RRRRRR     //
//     RR  RR  EE      NN  NNN DD   DD EE      RR  RR     //
//     RR   RR EEEEEEE NN   NN DDDDDD  EEEEEEE RR   RR    //
//                                                        //
////////////////////////////////////////////////////////////
  
  /**
   * Override it if you want to use custom render when somebody was win
   */
  renderCongratulation(){
    // Example:
    // alert('Congratulation', this.player.name)
  }
  renderMove () {
  
  }
  renderChangePlayer () {
  
  }
  renderSpotIsBusy() {
  
  }
  renderNoOneWon() {
  
  }
  
//////////////////////////////////////////////////////
//   ____      _     _   _  ____    ___   __  __    //
//   |  _ \    / \   | \ | ||  _ \  / _ \ |  \/  |  //
//   | |_) |  / _ \  |  \| || | | || | | || |\/| |  //
//   |  _ <  / ___ \ | |\  || |_| || |_| || |  | |  //
//   |_| \_\/_/   \_\|_| \_||____/  \___/ |_|  |_|  //
//                                                  //
//////////////////////////////////////////////////////
  
  async botRandomMove() {
    await sleep(500)
    console.info(`${this.player.name} ходит случайно`)
    let index = this.availableSpots().randomItem()
    this.move(index)
  }
  
//////////////////////////////////////////////////////////////////////////////
//                                                                          //
//     .___  ___.  __  .__   __.  __  .___  ___.      ___      ___   ___    //
//     |   \/   | |  | |  \ |  | |  | |   \/   |     /   \     \  \ /  /    //
//     |  \  /  | |  | |   \|  | |  | |  \  /  |    /  ^  \     \  V  /     //
//     |  |\/|  | |  | |  . `  | |  | |  |\/|  |   /  /_\  \     >   <      //
//     |  |  |  | |  | |  |\   | |  | |  |  |  |  /  _____  \   /  .  \     //
//     |__|  |__| |__| |__| \__| |__| |__|  |__| /__/     \__\ /__/ \__\    //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
  
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
  
  /**
   * Should I do it more simplify?
   * @param board
   * @returns {string|{score: number}}
   */
  minimaxReturnScore(board) {
    let winner = this.whoWon(board)
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
  
  /**
   * Main algorithm of MINIMAX
   * @param newBoard
   * @param player
   * @param depth
   * @returns {*|string|{score: number}}
   */
  minimax(newBoard, player, depth) {
    let returnScore = this.minimaxReturnScore(newBoard)
    if (returnScore !== 'continue') return returnScore
    
    let moves = this.minimaxMoves(newBoard, player, depth)
    
    return this.minimaxBestMove(moves, player)
  }
  
  /**
   * Collect all available moves
   * @param newBoard
   * @param player
   * @param depth
   * @returns {[]}
   */
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
  
  /**
   * Chose the best move of collect minimaxMoves()
   * @param moves
   * @param player
   * @returns {*}
   */
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