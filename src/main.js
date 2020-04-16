import App from './App.svelte'

Array.prototype.randomItem = function () {
	return this[Math.floor(Math.random() * this.length)];
}

const app = new App({
	target: document.body,
	props: {
		appName: 'Tic-Tac-Toe',
		winCases: /(^111......$)|(^...111...$)|(^......111$)|(^1..1..1..$)|(^.1..1..1.$)|(^..1..1..1$)|$(1...1...1)|(^..1.1.1..$)/g,
		moveN: 1,
		sign: 'X',
		board: [
			' ', ' ', ' ',
			' ', ' ', ' ',
			' ', ' ', ' ',
		],
		// board: [
		// 	'_', '_', '_',
		// 	'_', '_', '_',
		// 	'_', '_', '_',
		// ],
		X: 'X',
		O: 'O',
		playerEmojis: ['😃', '🙃', '😅', '😘']
	}
})

export default app