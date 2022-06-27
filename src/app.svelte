<script>
import Game from './game.svelte'
import Footer from './footer.svelte'
import GameSession from './gameSession'
let debug = false

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
		<button id="newGame" on:click={() => game = undefined}>New Game</button>
		{:else}
		<h1>Your names</h1>
		<form action="" on:submit={()=> game = new GameSession(player1, player2)}>
			<input required placeholder="🧑‍🚀 – X " bind:value={player1}>
			🆚
			<input required placeholder="🧑‍🚀 – O" bind:value={player2}>
			<br>
			<button id="play" type="submit">Play 🚀</button>
		</form>
		<h2>How to play with bots?</h2>
		<p><b>Random Bot</b>
			<br>His name has to contain 'random'.
			<br>Example: <i>MikeRandom, randomner, randomBot</i>
		</p>
		<p><b>Minimax Bot</b>
			<br>His name has to contain 'minimax'.
			<br>Example: <i>JohnMinimax, minimax, BotMinimax</i>
		</p>
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
	input, button {
		text-align: center;
		min-width: 130px;
		max-width: 130px;
		width: 130px;
	}
	#play {
		min-width: 285px;
		max-width: 285px;
		width: 285px;
	}
	#newGame {
		min-width: 100px;
		max-width: 100px;
		width: 100px;
		/*border: black 2px solid;*/
	}
</style>
