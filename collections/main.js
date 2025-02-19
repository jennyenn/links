// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)


// Okay, Are.na stuff!
let channelSlug = 'women-in-soccer' // The “slug” is just the end of the URL
// change this to my channel name


// so cool!! grab data from are.na
// let placeChannelInfo = (data) => {
// 	// Target some elements in your HTML:
// 	let channelTitle = document.querySelector('#channel-title')
// 	let channelDescription = document.querySelector('#channel-description')
// 	let channelCount = document.querySelector('#channel-count')
// 	let channelLink = document.querySelector('#channel-link')

// 	// Then set their content/attributes to our data:
// 	channelTitle.innerHTML = data.title
// 	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
// 	channelCount.innerHTML = data.length
// 	channelLink.href = `https://www.are.na/channel/${channelSlug}`
// }

// Then our big function for specific-block-type rendering:


let renderBlock = (block) => {
	
	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.querySelector('#channel-blocks')
	let imageBlocks = document.querySelector('#image-blocks')
	let videoBlocks = document.querySelector('#video-blocks')
	let textBlocks = document.querySelector('#text-blocks')
	let audioBlocks = document.querySelector('#audio-blocks')
	let linkBlocks = document.querySelector('#link-blocks')

	console.log(block)

	// Links!
	if (block.class == 'Link') {

		let linkItem =
			`
			<li>
				<picture>
					<a href="${ block.source.url }">  <img src="${ block.image.original.url }"></a>
					<source media="(max-width: 428px)" srcset="${ block.image.thumb.url }">
					<source media="(max-width: 640px)" srcset="${ block.image.large.url }">
				</picture>
			</li>
			`
			// put these in the hover part		
			// <h3>${ block.title }</h3>
			// ${ block.description_html }
			// <p><a href="${ block.source.url }">See the original ↗</a></p> 

			linkBlocks.insertAdjacentHTML('beforeend', linkItem)
	}

	// Images!
	else if (block.class == 'Image') {
		console.log(block)

		let imageItem = 
		`
		<div class = "image-blocks">
			<img src="${block.image.original.url}">
			<figcaption>
				<p>${block.title}</p>
				<p>${block.description}</p>
			</figcaption>
		</div>
		
		`;

		imageBlocks.insertAdjacentHTML('beforeend', imageItem);;

		// …up to you!
	}

	// Text!
	else if (block.class == 'Text') {
		// …up to you!
		let textItem = 
		
		`
			<blockquote>
				<p>${block.content}</p>
			</blockquote>
		`;

		textBlocks.insertAdjacentHTML('beforeend', textItem);;

	}

	// Uploaded (not linked) media…
	else if (block.class == 'Attachment') {

		let attachment = block.attachment.content_type // Save us some repetition

		// Uploaded videos!
		if (attachment.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
			let videoItem =
				
				`
				<li class="video-blocks">
					<video controls src="${ block.attachment.url }"></video>
				</li>
				`
			videoBlocks.insertAdjacentHTML('beforeend', videoItem)
			// More on video, like the `autoplay` attribute:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
		}

		// Uploaded PDFs!
		else if (attachment.includes('pdf')) {

			let PDFItem =
				`
				<embed src="${ block.attachment.url }" class="PDF"> 
					
				`
			linkBlocks.insertAdjacentHTML('beforeend', PDFItem)

			// PDF display: https://stackoverflow.com/questions/17784037/how-to-display-pdf-file-in-html
		

			// …up to you!
		}

		// Uploaded audio!
		else if (attachment.includes('audio')) {
			
			console.log(block)

			// …still up to you, but here’s an `audio` element:
			let audioItem =

				`
				<li>
					<p> ${ block.title }</p>
					<audio controls src="${ block.attachment.url }" ></audio>
				</li>
				`
			audioBlocks.insertAdjacentHTML('beforeend', audioItem)
			// More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
		}
	}

	// Linked media…
	else if (block.class == 'Media') {
		let embed = block.embed.type

		// Linked video!
		if (embed.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			let linkedVideoItem =
			
				`
				<li class="video-blocks">
					${ block.embed.html }
				</li>
				`
			videoBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
			// reference: https://www.w3schools.com/tags/tag_iframe.ASP
		}

	// Linked audio!(Behance)
	else if (embed.includes('rich')) {

		console.log(block)
	
		let RichItem = 
			
			`
			<li class="rich">
				${ block.embed.html }
			</li>
			`
		linkBlocks.insertAdjacentHTML('beforeend', RichItem)
		// …up to you!
	}

	}
}


// It‘s always good to credit your work:
// let renderUser = (user, container) => { // You can have multiple arguments for a function!
// 	let userAddress =
// 		`
// 		<address>
// 			<h3>${ user.first_name }</h3>
// 			<p><a href="https://are.na/${ user.slug }">Are.na profile ↗</a></p>
// 		</address>
// 		`
// 	container.insertAdjacentHTML('beforeend', userAddress)
// }

// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log(data) // Always good to check your response!
		// placeChannelInfo(data) // Pass the data to the first function

		// Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
		data.contents.reverse().forEach((block) => {
			// console.log(block) // The data for a single block
			renderBlock(block) // Pass the single block data to the render function
		})

		// let imagehover = document.querySelectorAll('.image-blocks');
		// imagehover.forEach((imageHover) => {
		// 	let figure = imageHover.querySelector('figure');

		// 	imageHover.addEventListener("mouseenter", () => {
		// 		figure.classList.add('display');
		// 	});

		// 	imageHover.addEventListener("mouseleave", () => {
		// 		figure.classList.remove('display');
		// 	});

		// // mouseenter and leave: https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event
		// })


		// fail!!!!!!

	// 	let showcolorClass = 'showcolor' // Variables again.
	// 	let showcolorBlocks = document.querySelectorAll('.video-blocks') // Get all of them.

	// 	// Loop through the list, doing this `forEach` one.
	// 	showcolorBlocks.forEach((block) => {
	// 	let sectionObserver = new IntersectionObserver((entries) => {
	// 	let [entry] = entries

	// 	if (entry.isIntersecting) {
	// 		block.classList.add(showcolorClass)
	// 	} else {
	// 		block.classList.remove(showcolorClass)
	// 	}
	// })

	// sectionObserver.observe(block) // Watch each one!
	// })

		// Also display the owner and collaborators:
		let channelUsers = document.querySelector('#channel-users') // Show them together
		data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
		renderUser(data.user, channelUsers)
	})