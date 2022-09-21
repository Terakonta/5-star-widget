class Rating extends HTMLElement 
{      
    constructor()
    {
        super();

        var template = document.querySelector('#rating-template').content;
      	this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true));       
    }

    connectedCallback() 
    {
        var stars = this.shadowRoot.querySelectorAll(".star");
    
        // So ratings can only be submitted once
        var ratingGiven = false;

        // UUID of a product. Can get other product specific attributes and save them too
        var uuid = this.getAttribute("uuid");
        var productName = this.getAttribute("product-name");
        

        stars.forEach((star, i) => {
            
            star.onclick = function () 
            {
                
                if(!ratingGiven)
                {
                    ratingGiven = true;

                    // Fill stars based on which one is clicked
                    stars.forEach((star, j) => 
                    {
                        if (j <= i)
                        {
                            star.innerHTML = "&starf;";
                            star.style.color = "black"
                        }
                        else
                        {
                            star.innerHTML = "&star;";
                            star.style.color = "black"
                        }  
                    })

                    // Here we can make a POST request
                    console.log("Make a POST request to server with the rating: " + (i+1) + ", uuid: " + uuid + ", product name: " + productName + ", and other details.");

                }
            }

            star.onmouseover = function() 
            {

                if(!ratingGiven)
                {
                    // Highlight stars based on which one is hovered over
                    stars.forEach((star, j) => 
                    {
                        if (j <= i)
                        {
                            star.style.color = "gray";
                            star.innerHTML = "&starf;";
                        }
                        else
                        {
                            star.style.color = "black";
                            star.innerHTML = "&star;";
                        }
                    })
                }
            }

            star.onmouseout = function() 
            {
                if(!ratingGiven)
                {
                    stars.forEach((star, j) => 
                    {   
                        star.style.color = "black";
                        star.innerHTML = "&star;";
                    })
                }
            }
        })

    }
}

customElements.define("rating-component", Rating);
