<script>
  let player1 = 'random1', player2 = 'random2', player = player1, winner, standoff

  export let moveN, sign, winCases, board, emojis, X, O, debug
  let playerEmoji = emojis.randomItem(), availableSpots =  board.findIndices(s => s === ' '),
		  sign2 = O
  function sleep(ms) {
	  return new Promise(resolve => setTimeout(resolve, ms));
  }

  class Player {
	constructor(name, sign, move) {
		  this.name = name
		  this.sign = sign
		  this.move = move
	}
  }


  function changePlayer() {
	  moveN++
	  sign2 = moveN % 2 ? O : X
	  sign = moveN % 2 ? X : O
	  player = moveN % 2 ? player1 : player2
	  playerEmoji = emojis.randomItem()
  }


  async function botRandomMove() {
	  await sleep(600)
	  let spot = availableSpots.randomItem()
	  board[spot] = sign
	  afterMove()
  }

  async function botMinimaxMove() {
	  await sleep(600)
	  let spot = minimax(board, sign)
	  board[spot] = sign
	  afterMove()
  }

  function minimax(board, sign) {
  	return isPlayerWon(board, sign) ? -10 : isPlayerWon(board, sign2)
  }

  function humanMove(move) {
	  move()
	  afterMove()
  }

  function hasAnyoneWon() {
	  winner = isPlayerWon() ? player : null
  }

  function afterMove() {
	  availableSpots = board.findIndices(s => s === ' ')
	  if (!isPlayerWon(board, sign)) {
		  changePlayer()
		  // if current player is bot
		  let name = player.toLowerCase()
		  if (name.indexOf('random') >= 0) botRandomMove()
		  else if (name.indexOf('minimax') >= 0) botMinimaxMove()
	  } else hasAnyoneWon()
  }

  function isPlayerWon(board, sign) {
  	  // Board => Mask
	  let mask = board.join('').replace(new RegExp(sign, 'g'), '1')
	  // To check mask with winning cases
	  return mask.search(winCases) === 0
  }


	afterMove()


</script>

<main>
	{#if player && winner === undefined}
		<h1>{playerEmoji} It is your turn, {player}!</h1>
		<article>
			{#each board as b, i}
				<!-- Some Tricks, anyway -->
				<section on:click|once={humanMove(() => board[i] = sign)}>
					{board[i]}
				</section>
			{/each}
		</article>
		<h2>Move Number: {moveN}, Sign {sign}</h2>
	{:else}
		<h1>Please enter your names</h1>
		<form action="" on:submit={ ()=> player=player1 }>
			<input placeholder="player1" bind:value={player1}>
			<input placeholder="player2" bind:value={player2}>
			<button type="submit">Play</button>
		</form>
		<h2>Docs</h2>
		<ul>
			<li>If you wanna play with Random bot, Please set player like: JohnRandom, randomBot or random</li>
		</ul>
	{/if}
	{#if winner }
		<h1>{winner} is winner!</h1>
		<button onclick="document.location.reload(true)">Again?</button>
	{/if}
	{#if standoff }
		<h1>No one won</h1>
		<button onclick="document.location.reload(true)">Again?</button>
	{/if}
	<pre style="font-size: 20px">{availableSpots}</pre>
	<pre style="font-size: 20px">{winner}</pre>
</main>

<style>
	h1, h2, h3 {
		text-align: center;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	article {
		display: inline-grid;
		grid-template-rows: 100px 100px 100px;
		grid-template-columns: 100px 100px 100px;
		/*grid-gap: 3px;*/
	}

	section {
		display: flex;
		/*background: #cccccc;*/
		justify-content: center;
		align-items: center;
		border: 2px solid black;
		font-size: 3em;
	}


</style>