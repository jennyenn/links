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
	// let channelBlocks = document.querySelector('#channel-blocks')
	let imageBlocks = document.querySelector('#image-blocks')
	let videoBlocks = document.querySelector('#video-blocks')
	let textBlocks = document.querySelector('#text-blocks')
	let audioBlocks = document.querySelector('#audio-blocks')
	let linkBlocks = document.querySelector('#link-blocks')

	// Links!
	if (block.class == 'Link') {

		let linkItem =
			`
			<li class="link-blocks">
				<picture>
					<img src="${ block.image.original.url }">
					<source media="(max-width: 428px)" srcset="${ block.image.thumb.url }">
					<source media="(max-width: 640px)" srcset="${ block.image.large.url }">
				</picture>
				<a href="${ block.source.url }">
					<div class="linkoverlay">
						<h3>${block.title}</h3>
						<p class="description"${block.description_html}</p>
						<p class="arrow" >↗</p>
					</div>
				</a>
			</li>
			`

			linkBlocks.insertAdjacentHTML('beforeend', linkItem)
	}

	// Images!
	else if (block.class == 'Image') {
		console.log(block.title);
		let imageItem = 
		`
		<figure class="image-blocks">
			<img src="${block.image.original.url}">
			<figcaption>
				<p>${block.title}</p>
				<p>${block.description}</p>
			</figcaption>
		</figure>
		
		`;

		imageBlocks.insertAdjacentHTML('beforeend', imageItem);;

		// …up to you!
	}

	// Text!
	else if (block.class == 'Text') {

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
					<p> < ${block.title} ></p>
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
				<li class="link-blocks">
					<embed src="${ block.attachment.url }" class="PDF"> 
					<a href="${ block.source.url }">
						<div class="linkoverlay">
							<h3>${block.title}</h3>
							<p class="description">${block.description_html}</p>
							<p class="arrow" >↗</p>
						</div>
					</a>
				</li>
					
				`
			linkBlocks.insertAdjacentHTML('beforeend', PDFItem)

			// PDF display: https://stackoverflow.com/questions/17784037/how-to-display-pdf-file-in-html
		

			// …up to you!
		}

		// Uploaded audio!
		else if (attachment.includes('audio')) {

			// …still up to you, but here’s an `audio` element:
			let audioItem =

				`
				<li class="soccerbuttom">
					<p> ${ block.title }</p>
					<img src="../assets/soccer1.png">
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
					<p>< ${block.title}></p>
					${ block.embed.html }
				</li>
				`
			videoBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
			// reference: https://www.w3schools.com/tags/tag_iframe.ASP
		}

	// Linked audio!(Behance)
	else if (embed.includes('rich')) {
	
		let RichItem = 
			
			`
			<li  class="link-blocks rich">
					${ block.embed.html }
					<a href="${ block.source.url }">
						<div class="linkoverlay">
							<h3>${block.title}</h3>
							<p class="description">${block.description_html}</p>
							<p class="arrow" >↗</p>
						</div>
					</a>
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

		// display figcaption

		// let displayClass = 'display' // Variables again.
		// let displayBlocks = document.querySelectorAll('.image-blocks') // Get all of them.




		// video blur IntersectionObserver
		// actually it will change the opacity, but i haven't edit the class name lol

		let notblurvideoClass = 'notblur' // Variables again.
		let notblurvideoBlocks = document.querySelectorAll('.video-blocks') // Get all of them.

		// Loop through the list, doing this `forEach` one.
		notblurvideoBlocks.forEach((block) => {
		let sectionObserver = new IntersectionObserver((entries) => {
		let [entry] = entries

		if (entry.isIntersecting) {
			block.classList.add(notblurvideoClass)
		} else {
			block.classList.remove(notblurvideoClass)
		}}, {
			rootMargin: '0% 10% 0% 10% ', // CSS-ish: top/right/bottom/left.
		})

		sectionObserver.observe(block) // Watch each one!
		})


		// links blur IntersectionObserver
		// actually it will change the opacity, but i haven't edit the class name lol

		let notblurlinkClass = 'notblur' // Variables again.
		let notblurlinkBlocks = document.querySelectorAll('.link-blocks') // Get all of them.

		// Loop through the list, doing this `forEach` one.
		notblurlinkBlocks.forEach((block) => {
		let sectionObserver = new IntersectionObserver((entries) => {
		let [entry] = entries

		if (entry.isIntersecting) {
			block.classList.add(notblurlinkClass)
		} else {
			block.classList.remove(notblurlinkClass)
		}}, {
			rootMargin: '0% -30% 0% -30%', // CSS-ish: top/right/bottom/left.
		})

		sectionObserver.observe(block) // Watch each one!
		})


		// slide in effect on text-block

		let slideinClass = 'slidein' // Variables again.
		let slideinBlocks = document.querySelectorAll('blockquote p') // Get all of them.

		// Loop through the list, doing this `forEach` one.
		slideinBlocks.forEach((block) => {
		let sectionObserver = new IntersectionObserver((entries) => {
		let [entry] = entries

		if (entry.isIntersecting) {
			block.classList.add(slideinClass)
		} else {
			block.classList.remove(slideinClass)
		}}, {
			rootMargin: '-33%  0%  -33% 0% ', // CSS-ish: top/right/bottom/left.
		})

		sectionObserver.observe(block) // Watch each one!
		})


		// play audio when press soccer image

		let soccerButtom = document.querySelectorAll('.soccerbuttom')

		soccerButtom.forEach((button) => {

			let audio = button.querySelector('audio') // Inside of each button.

			button.onclick = () => { audio.play() }
		})


		// click button and open the menu

		let button = document.querySelector('#navbutton')
		let modal = document.querySelector('#menu') // Now one for our `dialog`.
		let closeButton = modal.querySelector('.close') // Only looking within `modal`.

		button.onclick = () => { // “Listen” for clicks.
			modal.showModal() // This opens it up.
		}

		closeButton.onclick = () => {
			modal.close() // And this closes it!
		}

		modal.onclick = (event) => { // Listen on our `modal` also…
			if (event.target == modal) { // Only if clicks are to itself (the background).
				modal.close() // Close it then too.
			}
		}


		// Also display the owner and collaborators:
		let channelUsers = document.querySelector('#channel-users') // Show them together
		data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
		renderUser(data.user, channelUsers)
	})