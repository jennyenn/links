// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)


// Okay, Are.na stuff!
let channelSlug = 'women-in-soccer' // The “slug” is just the end of the URL
// change this to my channel name


// so cool!! grab data from are.na
let placeChannelInfo = (data) => {
	// Target some elements in your HTML:
	let channelTitle = document.querySelector('#channel-title')
	let channelDescription = document.querySelector('#channel-description')
	let channelCount = document.querySelector('#channel-count')
	let channelLink = document.querySelector('#channel-link')

	// Then set their content/attributes to our data:
	channelTitle.innerHTML = data.title
	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
	// channelCount.innerHTML = data.length
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
}

// I want to make #soccer moves when I scroll right
// I found this tutorial: https://medium.com/starbugs/%E7%94%A8%E7%B0%A1%E5%96%AE%E7%9A%84-css-%E5%92%8C-javascript-%E8%BC%95%E9%AC%86%E8%A3%BD%E9%80%A0%E8%A6%96%E5%B7%AE%E6%BB%BE%E5%8B%95-parallax-scrolling-4e22af7c1c0
// https://codepen.io/ms314006/pen/RwpOWxP
// what I learn: 
// 1. window.pageXOffset returns the pixels a document has scrolled
// 2. soccer.style.transform: target the soccer element and style it.

window.addEventListener('scroll',() => {

	// for desktop
	const scrollX = window.pageXOffset;
	const soccer = document.querySelector('#soccer img')
	const scrollYPosition = scrollX/3;
	const soccerTop = soccer.offsetTop;
	const soccerHeight = soccer.offsetHeight;  
	// height of the soccer: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
	const windowHeight = window.innerHeight; 
	// height of the screen: https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight

	const soccerbottom = soccerTop+scrollYPosition+soccerHeight;
	const rebound =soccerbottom - windowHeight ;
	
	if(soccerbottom >= windowHeight){
		soccer.style.transform = `translateX(${scrollX}px) translateY(-${rebound}px)`;
	}else{
		soccer.style.transform = `translateX(${scrollX}px) translateY(${scrollYPosition}px)`;
	}
})

window.addEventListener('scroll',() => {
	// for mobile
	const scrollY = window.pageYOffset;
	const soccer = document.querySelector('#soccer img')
	const scrollXPosition = scrollY/2.7;

	console.log('scrollY:', scrollY);

	if(scrollY>0){
		soccer.style.transform = `translateX(-${scrollXPosition}px) translateY(${scrollY*1.55}px)`;
	}
})

// console.log('scrollY:', scrollY);
// if(scrollY>0){
// 	soccer.style.transform = `translateY(${scrollY}px)`;
// }

// Then our big function for specific-block-type rendering:
// let renderBlock = (block) => {
	
// 	// To start, a shared `ul` where we’ll insert all our blocks
// 	let channelBlocks = document.querySelector('#channel-blocks')

// 	// Links!
// 	if (block.class == 'Link') {

// 		let linkItem =
// 			`
// 			<li>
// 				<picture>
// 					<a href="${ block.source.url }">  <img src="${ block.image.original.url }"></a>
// 					<source media="(max-width: 428px)" srcset="${ block.image.thumb.url }">
// 					<source media="(max-width: 640px)" srcset="${ block.image.large.url }">
// 				</picture>
// 			</li>
// 			`
// 			// put these in the hover part		
// 			// <h3>${ block.title }</h3>
// 			// ${ block.description_html }
// 			// <p><a href="${ block.source.url }">See the original ↗</a></p> 

// 		channelBlocks.insertAdjacentHTML('beforeend', linkItem)
// 	}

// 	// Images!
// 	else if (block.class == 'Image') {

// 		let imageItem = 
		
// 		`
// 			<img src="${block.image.original.url}">
// 		`;

// 		channelBlocks.insertAdjacentHTML('beforeend', imageItem);;

// 		// …up to you!
// 	}

// 	// Text!
// 	else if (block.class == 'Text') {
// 		// …up to you!
// 		let textItem = 
		
// 		`
// 			<blockquote>
// 				<p>${block.content}</p>
// 			</blockquote>
// 		`;

// 		channelBlocks.insertAdjacentHTML('beforeend', textItem);;

// 	}

// 	// Uploaded (not linked) media…
// 	else if (block.class == 'Attachment') {

// 		let attachment = block.attachment.content_type // Save us some repetition

// 		// Uploaded videos!
// 		if (attachment.includes('video')) {
// 			// …still up to you, but we’ll give you the `video` element:
// 			let videoItem =
				
// 				`
// 				<img src="${ block.image.original.url }">
// 				<li>
// 					<video controls src="${ block.attachment.url }"></video>
// 				</li>
// 				`
// 			channelBlocks.insertAdjacentHTML('beforeend', videoItem)
// 			// More on video, like the `autoplay` attribute:
// 			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
// 		}

// 		// Uploaded PDFs!
// 		else if (attachment.includes('pdf')) {

// 			let PDFItem =
// 				`
// 				<li class="blocks">
// 					<p> PDF: ${ block.title }</p>
// 					${ block.attachment.url }
// 				</li>
// 				`
// 			channelBlocks.insertAdjacentHTML('beforeend', PDFItem)
		

// 			// …up to you!
// 		}

// 		// Uploaded audio!
// 		else if (attachment.includes('audio')) {
			
// 			console.log(block)

// 			// …still up to you, but here’s an `audio` element:
// 			let audioItem =

// 				`
// 				<li class="blocks">
// 					<p> audio: ${ block.title }</p>
// 					<audio controls src="${ block.attachment.url }" style=" width:300px ;height:20px " ></audio>
// 				</li>
// 				`
// 			channelBlocks.insertAdjacentHTML('beforeend', audioItem)
// 			// More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
// 		}
// 	}

// 	// Linked media…
// 	else if (block.class == 'Media') {
// 		let embed = block.embed.type

// 		// Linked video!
// 		if (embed.includes('video')) {
// 			// …still up to you, but here’s an example `iframe` element:
// 			let linkedVideoItem =
			
// 				`
// 				<li>
// 					${ block.embed.html }
// 				</li>
// 				`
// 			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
// 			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
// 			// reference: https://www.w3schools.com/tags/tag_iframe.ASP
// 		}

// 	// Linked audio!(Behance)
// 	else if (embed.includes('rich')) {

// 		console.log(block)
	
// 		let RichItem = 
			
// 			`
// 			<li class="blocks">
// 				${ block.embed.html }
// 			</li>
// 			`
// 		channelBlocks.insertAdjacentHTML('beforeend', RichItem)
// 		// …up to you!
// 	}

// 	}
// }


// It‘s always good to credit your work:
let renderUser = (user, container) => { // You can have multiple arguments for a function!
	let userAddress =
		`
		<address>
			<h3>${ user.first_name }</h3>
			<p><a href="https://are.na/${ user.slug }">Are.na profile ↗</a></p>
		</address>
		`
	container.insertAdjacentHTML('beforeend', userAddress)
}

// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log(data) // Always good to check your response!
		placeChannelInfo(data) // Pass the data to the first function

		// Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
		data.contents.reverse().forEach((block) => {
			// console.log(block) // The data for a single block
			renderBlock(block) // Pass the single block data to the render function
		})

		// Also display the owner and collaborators:
		let channelUsers = document.querySelector('#channel-users') // Show them together
		data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
		renderUser(data.user, channelUsers)
	})