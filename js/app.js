const inputField = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

inputField.addEventListener("keypress", function(event) {
    // event.preventDefault();
    if (event.key == 'Enter'){
        searchBtn.click();
    }
    
});

searchBtn.addEventListener('click',function(){
    getInputValue()
});

inputField.addEventListener('focus',function(event){

});

inputField.addEventListener('blur',function(event){
    
});

inputField.addEventListener('keyup',function(event){
    console.log(event.target.value)
});

const getInputValue= ()=>{
   const inputValue =inputField.value;
   inputField.value='';
   getSearchProduct(inputValue);
   
};

const getSearchProduct = (category)=>{
    const url= `https://fakestoreapi.com/products/category/${category}`
    fetch(url)
    .then(res=>res.json())
    .then(data => {
        // showSearchValue(data)
        showDataUi(data)
        console.log(data)
    });

    console.log(url)
};

// const showSearchValue = (data)=>{
   
//     data.forEach(product=>{
//         if(inputField.value === product.category){

//         }else{
//           const x = document.getElementById('${product.id}').style.display="none";
//           console.log(x)
//         }
//     })
// }



/* load api data */
const loadData = ()=>{
    fetch(`https://fakestoreapi.com/products`)
    .then(res =>res.json())
    .then(data=> {
        showDataUi(data);
    })
}

 loadData() 


//  get single data 

const loadSingleData = (id)=>{
    const url = `https://fakestoreapi.com/products/${id}`
    fetch(url)
    .then(res =>res.json())
    .then(data=>{
        showSingleData(data)
    })

    console.log(url)
}


const showSingleData = (data)=>{

   let detailsArea = document.getElementById('modal-area');
   detailsArea.textContent="";
    const div = document.createElement('div');

    div.classList.add('details-cart');
    
    div.innerHTML = `
    
    <div>
<div class="image">
<img class="image-details" src="${data.image}" alt="img">
</div>
<h5 class="category">${data.category} </h5>
<p class="discription">${data.description}</p>
<h5 class="rating">Rating:${data.rating.rate}</h5>
        <h5 class="rating">Rated:</i>${data.rating.count}</h5>
        <button onclick="countProduct(${data.price})" class="btn btn-success">Add to cart</button>
</div>

</div> 
    
    
    `;

    detailsArea.appendChild(div)
}

// show data in ui function

const showDataUi= data=>{
    const productArea = document.getElementById('product-area')
    productArea.textContent="";
    
    data.forEach(product=>{
        const div= document.createElement('div');

    div.classList.add('col')
        div.innerHTML=`
        <div class="card h-100 p-4 productCard">
        <img src="${product.image}" class="card-img-top" alt="...">
        <div class="card-body mt-3">
          <h3 class="card-title text-center "> ${product.title} </h3>
          <h4 class="card-text text-center my-4">${product.category}</h4>
          <h5 class="text-center"> Price: ${product.price} </h5>
          
            <div class="d-flex justify-content-between">
            
               <h5>Rating: ${product.rating.rate}</h5>
               <h5>Rate: ${product.rating.count}</h5>
            
            </div>
            <div class="d-flex justify-content-around mt-3">
            <button onclick="countProduct(${product.price})" class="btn btn-success">Add to cart</button>
            <button  onclick="loadSingleData (${product.id})" id="details-btn" class="btn btn-danger"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
            
            </div>
        </div>              
        </div>
        
        `
        productArea.appendChild(div)
    })
}
let count = 0;
const countProduct = (price)=>{
count= count + 1;
updatePrice('price', price);
updateTaxAndCharge();
updatetotal()

document.getElementById('total-Products').innerText = count;
}

const getInputPrice= id =>{
    const convartOldPrice = document.getElementById(id).innerText;
    const convart = parseFloat(convartOldPrice);
    return  convart;
}

const updatePrice = (id, value)=>{
    
    const convartvalue = getInputPrice('price')
    const  convartPrice = parseFloat(value);
    const totalprice = convartvalue + convartPrice;
    document.getElementById(id).innerText = parseFloat(totalprice.toFixed(2));
}

const setInnertext= (id, value)=>{
    const productCharge = parseFloat(value.toFixed(2));
    document.getElementById(id).innerText=productCharge;
          
}


const updateTaxAndCharge= (dalyvery, tax)=>{
    const price= getInputPrice('price');
    if(price> 200){
       setInnertext('delivery-charge', 30)
        setInnertext('total-tax', price *0.2)
    }
    if(price> 400){
       setInnertext('delivery-charge', 50)
        setInnertext('total-tax', price *0.3)
    }
    if(price> 500){
       setInnertext('delivery-charge', 60)
        setInnertext('total-tax', price *0.4)
    }
}


const updatetotal = ()=>{
    const total = getInputPrice('price')+ getInputPrice('delivery-charge') + getInputPrice('total-tax');

    document.getElementById('total').innerText= parseFloat(total.toFixed(2))
}


