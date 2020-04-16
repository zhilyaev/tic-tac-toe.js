<script>

  let player1, player2, player, winner

  export let moveN, sign, winCases, board, playerEmojis, X, O
  let playerEmoji = playerEmojis.randomItem(),
	  debug = false

  function changePlayer() {
	  sign = moveN % 2 ? X : O
	  player = moveN % 2 ? player1 : player2
	  playerEmoji = playerEmojis.randomItem()
  }

  function move(fillBoard) {
	  fillBoard()
	  moveN++
	  if (isWin(sign)){
	  	winner = player
	  }
	  else changePlayer()
  }

  function isWin(sign) {
	  let c = board.join('').replace(new RegExp(sign, 'g'), '1')
	  return c.search(winCases) === 0
  }
</script>

<main>
	{#if player}
		<h1>{playerEmoji} It is your turn, {player}!</h1>
		<article>
			{#each board as b, i}
				<!-- Some Tricks, anyway -->
				<section on:click|once="{move(() => board[i] = sign)}">
					{board[i]}
				</section>
			{/each}
		</article>
	{:else}
		<h1>Please enter your names</h1>
		<form action="" on:submit={ ()=> player=player1 }>
			<input placeholder="player1" bind:value={player1}>
			<input placeholder="player2" bind:value={player2}>
			<button type="submit">Play</button>
		</form>
	{/if}
	{#if winner }
		<h1>{winner} is winner!</h1>
		<button onclick="document.location.reload(true)">Again?</button>
	{/if}
</main>

<style>
	h1 {
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