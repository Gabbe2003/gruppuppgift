interface Product {
    id: number;
    image: string;
    title: string;
    price: number;
}

import flower from './assets/flower.jpg'; 
import kamera from './assets/kamera.jpg';

const product: Product[] = [
    {
        id: 0,
        image: flower,
        title: 'Z Flip Foldable Mobile',
        price: 120,
    },
    {
        id: 1,
        image: kamera,
        title: 'Air Pods Pro',
        price: 60,
    },
    //mer produkter, samma struktur.
];

const categories: Product[] = [...new Set(product.map(item => item))];

const cart: Product[] = [];

function addToCart(index: number): void {
    cart.push({ ...categories[index] });
    displayCart();
}

function delElement(index: number): void {
    cart.splice(index, 1);
    displayCart();
}

function displayCart(): void {
    const cartItemElement = document.getElementById('cartItem');
    const totalElement = document.getElementById('total');
    const countElement = document.getElementById('count');

    if (countElement) {
        countElement.innerHTML = cart.length.toString();
    }

    if (cart.length === 0) {
        if (cartItemElement) {
            cartItemElement.innerHTML = "Your cart is empty";
        }
        if (totalElement) {
            totalElement.innerHTML = "$ 0.00";
        }
    } else {
        let total = 0;
        if (cartItemElement && totalElement) {
            cartItemElement.innerHTML = cart.map((item, index) => {
                total += item.price;
                totalElement.innerHTML = `$ ${total}.00`;

                return (
                    `<div class='cart-item'>
                        <div class='row-img'>
                            <img class='rowimg' src=${item.image}>
                        </div>
                        <p style='font-size:12px;'>${item.title}</p>
                        <h2 style='font-size: 15px;'>$ ${item.price}.00</h2>` +
                        `<i class='fa-solid fa-trash' onclick='delElement(${index})'></i></div>`
                );
            }).join('');
        }
    }
}

const rootElement = document.getElementById('root');
if (rootElement) {
    rootElement.innerHTML = categories.map((item, index) => {
        return (
            `<div class='box'>
                <div class='img-box'>
                    <img class='images' src=${item.image}></img>
                </div>
                <div class='bottom'>
                    <p>${item.title}</p>
                    <h2>$ ${item.price}.00</h2>` +
                    `<button onclick='addToCart(${index})'>Add to cart</button>` +
                `</div>
            </div>`
        );
    }).join('');
}

(window as any).addToCart = addToCart;
(window as any).delElement = delElement;
