import App from './App.svelte'

Array.prototype.randomItem = function () {
	return this[Math.floor(Math.random() * this.length)]
}


if (!Array.prototype.findIndices) {
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
		
		return a.length === 0 ? -1 : a
	}
}

const app = new App({
	target: document.body,
	props: {
		winCases: /(^111......$)|(^...111...$)|(^......111$)|(^1..1..1..$)|(^.1..1..1.$)|(^..1..1..1$)|(^1...1...1$)|(^..1.1.1..$)/g,
		moveN: 1,
		sign: 'X',
		board: [
			' ', ' ', ' ',
			' ', ' ', ' ',
			' ', ' ', ' ',
		],
		emptySpots: [
			true, true, true,
			true, true, true,
			true, true, true,
		],
		X: 'X',
		O: 'O',
		emojis: ['😃', '🙃', '😅', '😘'],
		debug: false
	}
})

export default app