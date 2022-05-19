
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var trashCartItemButtons = document.getElementsByClassName('fa-trash-o')
    console.log(trashCartItemButtons)
    for (var i = 0; i < trashCartItemButtons.length; i++) {
        var button = trashCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('form-control')
    console.log(quantityInputs)
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('cart-add')
    console.log(addToCartButtons)
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    var selectClassForms = document.getElementsByClassName('form-select')
    for (var i = 0; i < selectClassForms.length; i++) {
        var form = selectClassForms[i]
        form.addEventListener('change', classChanged)
    }

    document.getElementsByClassName('purchase-button')[0].addEventListener('click', purchaseClicked)
    

}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}
console.log(roundToTwo(1.6004))


function purchaseClicked() {
    alert('Tack för ditt köp!')
    document.location.reload(true)
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    console.log('item removed')
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()       
}

function classChanged(event) {
    var form = event.target
    var formValue = form.value
    var productContent = form.parentElement
    var priceElement = productContent.getElementsByClassName('original-price')[0]
    var price = parseFloat(priceElement.innerText)
    var finalPrice
    console.log(price)
    console.log(formValue)
    
    if (formValue == 1) {
        finalPrice = (price*2)
    }
    else if (formValue == 2) {
        finalPrice = (price*1.5)
    }
    else if (formValue == 3) {
        finalPrice = (price*1)
    }
    else if (formValue == 4) {
        finalPrice = (price*0.75)
    }
    console.log(finalPrice)

    productContent.getElementsByClassName('price')[0].innerText = `${Math.round(finalPrice * 100) / 100}kr`
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('product-name')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('img-fluid')[0].src
    var classForm = shopItem.getElementsByClassName('form-select')[0]
    var classElement = classForm.options[classForm.selectedIndex].text;
    console.log(title, price, imageSrc, classElement)
    addItemToCart(title, price, imageSrc, classElement)
    updateCartTotal()
}


function addItemToCart(title, price, imageSrc, classElement){
    var cartRow = document.createElement('tr')
    cartRow.classList.add('cartRow')
    var cartItems = document.getElementById('cart-container')
    var cartItemTitles = document.getElementsByClassName('item-title')
    console.log(cartItemTitles.innerText)
    for (var i = 0; i < cartItemTitles.length; i++){
        if (cartItemTitles[i].innerText == title){
            alert('This item is already added to the cart!')
            return
        }
    }
    var cartRowContents = `
    <td><img src="${imageSrc}" class="img-cart"></td>
    <td><strong class="item-title">${title}</strong><p>${classElement}</p></td>
    <td>
      <input class="form-control" type="number" value="1">
    </td>
    <td class="price">${price}</td>
    <td>
      <button type="button" class="btn btn-danger fa fa-trash-o" rel="tooltip"></a>
    </td>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('fa-trash-o')[0].addEventListener('click', removeCartItem)
    ready()
    
}

function updateCartTotal() {
    var cartItemContainer = document.getElementById('cart-container')[0]
    var cartRows = document.getElementsByClassName('cartRow')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        console.log(cartRow)
        var priceElement = cartRow.getElementsByClassName('price')[0]
        var quantityInput = cartRow.getElementsByClassName('form-control')[0]
        console.log(priceElement)
        console.log(quantityInput)
        var price = parseFloat(priceElement.innerText.replace('kr', ''))
        var quantity = quantityInput.value
        console.log(price)
        total = total + (price * quantity)
        
    }
    total = total.toFixed(2)
    document.getElementsByClassName('cart-total')[0].innerText = total + 'kr'
} 