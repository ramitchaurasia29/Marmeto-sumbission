let selectedColor = null;
let selectedSize = null;
let quantity = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448')
        .then(response => response.json())
        .then(data => {
            addProductData(data);
        })
        .catch(error => console.error('Error fetching product data:', error));

    document.getElementById('increment').addEventListener('click', () => {
        quantity++;
        document.getElementById('quantity').textContent = quantity;
    });

    document.getElementById('decrement').addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            document.getElementById('quantity').textContent = quantity;
        }
    });

   document.getElementById('add-to-cart').addEventListener('click', () => {
    if (selectedColor && selectedSize) {
        
        const selectedInfo = document.createElement('p');
        selectedInfo.style.padding='5px';
        selectedInfo.textContent = `Embrace Sideboard with Color ${selectedColor} and Size  ${selectedSize} added to cart`;
        document.getElementById('selected-info').appendChild(selectedInfo);

        setTimeout(() => {
            selectedInfo.remove();
        }, 5000);
    } else {
        alert('Please select a color and size.');
    }
    
});
});

function addProductData(data) {
    document.getElementById('product-title').textContent = data.product.title;
    document.getElementById('product-price').textContent = data.product.price;
    document.getElementById('original-price').textContent = data.product.compare_at_price;
    document.getElementById('vendor').textContent= data.product.vendor;
    // document.getElementById('product-image').src = data.product.images[1].src;[bcoz the images are not working]
    document.getElementById('description').textContent=data.product.description.slice(25,361); //exporting only the main parts

    const original_price=data.product.compare_at_price.slice(1); 
    const discount_price=data.product.price.slice(1);    

    //method to calculate discount 
    const discountPercentage = Math.round(((original_price - discount_price) / original_price) * 100);
    console.log(discountPercentage)
    document.getElementById('discount-percentage').textContent = `${discountPercentage}% off`;

    const colorOptions = document.querySelector('.color-options');
    data.product.options[0].values.forEach(colorObj => {
        const colorName = Object.keys(colorObj)[0]; //  color name
        const colorValue = colorObj[colorName]; //  color value
    
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color';
        colorDiv.style.backgroundColor = colorValue;
        colorDiv.setAttribute('data-color', colorValue);
    
        colorDiv.addEventListener('click', () => {
            document.querySelectorAll('.color').forEach(c => c.classList.remove('selected'));
            colorDiv.classList.add('selected');
            selectedColor = colorName; 
        });
    
        colorOptions.appendChild(colorDiv);
    });
    

    const sizeOptions = document.querySelector('.size-options');
    data.product.options[1].values.forEach(size => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'size';
        input.value = size;
        input.addEventListener('change', () => {
            selectedSize = size;
        });
        label.appendChild(input);
        label.appendChild(document.createTextNode(` ${size}`));
        label.style.backgroundColor="#9b9b9b";
        label.style.margin="8px";
        label.style.padding="5px";
        label.style.borderRadius="20px";
        sizeOptions.appendChild(label);
    });


}

