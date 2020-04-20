<script>
import GameSession from './gameSession'
import { fly } from 'svelte/transition'

export let game
let board = game.board,
    player = game.player,
    winner, nobody,
    emojis = ['😃', '🙃', '😅', '😘']

player.emoji = emojis.randomItem()


GameSession.prototype.renderMove = function () {
  board = this.board
}

GameSession.prototype.renderChangePlayer = function () {
  player = this.player
  player.emoji = emojis.randomItem()
}

GameSession.prototype.renderCongratulation = function () {
  // this.sleep(200)
  winner = this.player
  winner.msg = winner.name + ' is winner!'
  this.player = undefined
}

GameSession.prototype.renderNoOneWon = function () {
  winner = {
    msg: '🏁 No one won 😔'
  }
}
</script>

<div in:fly="{{y:-300, duration: 1000 }}" out:fly="{{y:-300, duration: 400 }}">
    {#if winner}
      <h1>{winner.msg}</h1>
    {:else}
      <h1>Your turn, {player.name}! {player.emoji}</h1>
    {/if}
    <article>
      {#each board as b, i}
        <section  on:click={() => game.humanMove(i)}>
          <span>{board[i]}</span>
        </section>
      {/each}
    </article>
</div>

<style>
  h1, h2, h3 {
    text-align: center;
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