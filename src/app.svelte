<script>
import Game from './game.svelte'
import Footer from './footer.svelte'
import GameSession from './gameSession'
let debug = true

let player1, player2, game
	if (debug) {
		player1 = 'Diamon'
		player2 = 'Minimax'
		game = new GameSession(player1, player2)
	}
</script>

<main>
	{#if game}
		<Game {game}/>
		<button on:click={() => game = undefined}>New Game</button>
		{:else}
		<h1>Your names</h1>
		<form action="" on:submit={()=> game = new GameSession(player1, player2)}>
			<input placeholder="player1" bind:value={player1}>
			<input placeholder="player2" bind:value={player2}>
			<button type="submit">Play</button>
		</form>
	{/if}
	<Footer />
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
</style>