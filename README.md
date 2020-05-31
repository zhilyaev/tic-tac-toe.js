# Tic-Tac-Toe

The perfect way to quick start develop bots to tic-tac-toe

![](https://sun1-29.userapi.com/qJB_UxrKzymf78Zal842UEXhRs5O1KHg-7imTQ/mbW-1isnOrs.jpg)

## Building 
 [Template Svelte-App](https://github.com/sveltejs/template.)


## Develop
```js
  async botYourBotName() {
    await sleep(500)
    console.info(`${this.player.name} your turn!`)
    let index = 6
    this.move(index)
  }


  bot (playerName) {
    console.info('=======================================')
    console.info('Новый ход:', this.i)
    console.info(playerName,'ходи!')
    switch (this.typeOfPlayer(playerName)) {
      case 'random':
        return this.botRandomMove()
       case 'botYourBotName':
        return this.botYourBotName()
      case 'minimax':
        return this.botMinimaxMove()
      case 'human':
    }
  }
```


TODO:
 - [ ] Any play area (More than 3*3)
 - [ ] Multiplayer
 - [ ] GeneticAlgoBot
 - [ ] NeuralNetworksBot
 - [ ] Adaptive UI
