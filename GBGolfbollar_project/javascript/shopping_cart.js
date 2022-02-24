
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
    var quantityInputs = getElementsByClassName('form-control')
    for (var i = o; i < quantityInputs.lentgh; i++) {
        input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = getElementsByClassName('cart-add')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

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

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('title')[0].innerText
    console.log(title)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementById('cart-container')[0]
    var cartRows = document.getElementsByName('cartRow')
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
    document.getElementsByClassName('cart-total')[0].innerText = total + 'kr'
}