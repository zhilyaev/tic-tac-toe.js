<script>
import GameSession from './gameSession'

export let game
let fixBoard = game.board

GameSession.prototype.renderMove = function () {
  fixBoard = this.board
}
</script>

<div>
  <h1>Your turn, {game.player.name}!</h1>
  <article>
    {#each fixBoard as b, i}
        <section on:click={() => game.humanMove(i)}>
          {fixBoard[i]}
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