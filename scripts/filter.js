const main =JSON.parse(window.localStorage.product).book;
//=========================filter box==============================================
let sp=main
let totalPage=0
const limitPage=9
let item_eachPage=[]
let currentPage=1
rendermainPage=(products,item_eachPage,currentPage)=>{
    totalPage = Math.ceil(products.length/limitPage)
        
        item_eachPage = products.slice(
            (currentPage-1)*limitPage,
            (currentPage-1)*limitPage + limitPage,
        )
     
        renderItem=(products)=>{
            let output = "";
            products.forEach(item => {
            output += `
              <div class="item">
                 <a class="item-img"><img src="`+item.image+`"/></a>
                 <p class="item-name">`+item.title+`</p> 
                 <p class="book-author">`+item.author+`</p>             
                 <p class="item-price">`+item.price+'.000đ'+`</p>
                 <button class="buy-btn" data-id="`+products[i].id+`" >
                  <i class="fas fa-shopping-cart" ></i>
                    Thêm vào giỏ hàng
                  </button>
              </div>
              `;
        })
        document.querySelector(".item-container").innerHTML = output
        }
        renderPage=(products)=>{
            totalPage =Math.ceil(products.length/limitPage)
            let output = "";
            for(let i=1; i<= totalPage; i++)
            { output += `<div onclick="handlePageNumber(${i})">${i}</div>`}
            document.getElementById("pagination-numbers").innerHTML=output
        }
        renderPage(products)
        renderItem(item_eachPage)
        
        handlePageNumber=(num)=>{
        currentPage = num
        item_eachPage = products.slice(
            (currentPage-1)*limitPage,
            (currentPage-1)*limitPage + limitPage,
        )
        renderItem(item_eachPage)
        }
}
rendermainPage(sp,item_eachPage,currentPage)   

filter=()=>{
     item_eachPage=[]
     currentPage=1
     totalPage=0
    let products=[]
    let type_choices= document.getElementsByClassName("type")
    let price_choices= document.getElementsByClassName("price")
    let savingtype_choices=[]
    let savingprice_choices=[]
 //===================lọc dk=================
    for( i=0; i<type_choices.length;i++){
        if(type_choices[i].checked == true) 
        savingtype_choices.push(type_choices[i].value)
    }
    
    for( i=0; i<price_choices.length;i++){
        if(price_choices[i].checked == true) 
        savingprice_choices.push(price_choices[i].value)
    }
    // if(!savingtype_choices.length){rendermainPage(sp,item_eachPage,currentPage)}
//===================lọc dk=================
//===================lọc sp theo dk================
 type_clear=(a)=>{
    let temp1=[]
    for( i=0; i<savingtype_choices.length;i++){
     let temp= a.filter(function(ele){return (ele.type.includes(savingtype_choices[i]))})
        for(j=0; j<temp.length; j++){
            temp1.unshift(temp[j])
        }
    }
    return temp1
    }
price_clear=(a)=>{
    let temp1=[]
    for( i=0; i<savingprice_choices.length;i++){
        let temp= a.filter(function(ele){
            switch(savingprice_choices[i]){
                case "1": {return (ele.price <=100)}
                case "2": {return (ele.price <=300 && ele.price >=100)}
                case "3": {return (ele.price <=500 && ele.price >=300)}
                case "4": {return (ele.price >=500)}
            }   
        })
           for(j=0; j<temp.length; j++){
               temp1.unshift(temp[j])
           }
       }
       return temp1
    }
//===================lọc sp theo dk================
//===================các Th lọc====================
    if(savingtype_choices.length !=0 &&  savingprice_choices.length ==0){products=type_clear(main)}
    else if(savingtype_choices.length ==0 &&  savingprice_choices.length !=0){products=price_clear(main)}
    else if(savingtype_choices.length !=0 &&  savingprice_choices.length !=0){
        products=type_clear(main)
        products=price_clear(products)}
    else{rendermainPage(sp,item_eachPage,currentPage); return}
//===================các Th lọc====================

    rendermainPage(products,item_eachPage,currentPage)
}
//=========================filter box==============================================

//=========================filter bar==============================================
// let box = document.getElementsByClassName('box')[0]
// let search =document.getElementById('search')
// window.addEventListener('load', ()=>{
//     sp.forEach(ele =>{
//         const {image, title, price} = ele
//         let card = document.createElement('a')
//         card.innerHTML=`<img src="${image}">
//                          <div class="content">
//                             <h6>${title}</h6>           
//                             <p>${price}.000đ</p>
//                          </div>`;
//         box.appendChild(card);
//     })
// })
// search.addEventListener('keyup',()=>{
//     let filter= search.value.toUpperCase();
//     let a = box.getElementsByTagName('a')
//     for (i = 0; i < a.length; i++) {

//         let b =a[i].getElementsByClassName('content')[0]
//         let c =b.getElementsByTagName('h6')[0]
//         let text =c.textContent || c.innerText

//         if(text.toUpperCase().indexOf(filter) > -1){
//             a[i].style.display = ''
//             box.style.visibility = "visible"
//             box.style.opacity = 1
//         }
//         else{ a[i].style.display = 'none'}
//         if(search.value == 0){
//             box.style.visibility = "hidden"
//             box.style.opacity = 0
//         } 
//     }
// })