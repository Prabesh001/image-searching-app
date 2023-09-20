const accessKey= "1xqY9FzttaP2t-9JeM2DkIXRjwsLT2_AbBPZRH9HRj4"

const formEle = document.querySelector('form')
const inputEle = document.getElementById('searchbar')
const searchResults= document.querySelector('.searchResults')
const showMore= document.querySelector('.show-more-button')

let inputData=''
let page=1

async function searchImages(){
  inputData=inputEle.value
  const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

  const response=await fetch(url)
  const data= await response.json()

  const results=data.results

  if(page===1){
    searchResults.innerHTML=''
  }

  results.map((result)=>{
    const imageWrapper = document.createElement('div')
    imageWrapper.classList.add('searchResult')

    const image=document.createElement('img')
    image.src= result.urls.small
    image.alt= result.alt_description

    const imageLink = document.createElement('a')
    imageLink.href= result.links.innerHTML
    imageLink.target = "_blank"
    imageLink.textContent= result.alt_description

    imageWrapper.appendChild(image)
    imageWrapper.appendChild(imageLink)
    searchResults.appendChild(imageWrapper)
  })
  page++

  if(page>1){
    showMore.style.display='block'
  }
}

formEle.addEventListener('submit',(event)=>{
  event.preventDefault();
  page=1
  searchImages()
})

showMore.addEventListener('click',()=>{
  searchImages()
})