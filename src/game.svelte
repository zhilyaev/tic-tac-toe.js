<script>
import GameSession from './gameSession'

export let game
let board = game.board,
    player = game.player,
    emojis = ['😃', '🙃', '😅', '😘']

player.emoji = emojis.randomItem()


GameSession.prototype.renderMove = function () {
  board = this.board
}

GameSession.prototype.renderChangePlayer = function () {
  player = this.player
  player.emoji = emojis.randomItem()
}

GameSession.prototype.congratulation = function () {
  player = this.player
}


</script>

<div>
  <h1>Your turn, {player.name}! {player.emoji}</h1>
  <article>
    {#each board as b, i}
        <section on:click={() => game.humanMove(i)}>
          {board[i]}
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