// Okay, Are.na stuff!
let channelSlug = 'typography-and-interaction-too' // The “slug” is just the end of the URL
// change this to my channel name

let placeChannelInfo = (data) =>{
	let title = document.querySelector('#channel-title')
	title.innerHTML = data.title
	// so cool!! grab data from are.na
}

// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log(data) // Always good to check your response!
		console.log(data.title)

		placeChannelInfo(data)
		// console.log(data.contents)

		let myFunction = (block) => {
			// console.log('test')
			// console.log(block.class)
			// console.log(block.title)
			if (block.class === 'Text'){
				console.log('text')
			}else if (block.class === 'Media'){
				console.log('media')
			}
		}

		data.contents.forEach(myFunction)
	})