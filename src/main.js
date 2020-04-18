import App from './app.svelte'

const app = new App({
	target: document.body,
	props: {
		name: 'tic-tac-toe',
		author: 'zhilyaev',
		debug: true
	}
})

export default app