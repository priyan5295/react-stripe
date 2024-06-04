import terrain from './assets/buy_box.png'
import crusher from './assets/black.png'
import earbuds from './assets/push_active.png'
import sunglass from './assets/sunglasses.png'


// blutooth speaker
//price_1PMSk203DZVnzjSRtMeUDGsn

//noiseheadpones
//price_1PMSpH03DZVnzjSRLk9AWqag

//push earbuds
//price_1PMSr103DZVnzjSRs5vEcq5J

//sunglasses
//price_1PMSra03DZVnzjSRGZF3luOf

const productsArray = [
    {
        id: "price_1PMSk203DZVnzjSRtMeUDGsn",
        title: "Bluetooth Speaker",
        price: 89.99,
        currency: "USD",
        image: terrain
    },
    {
        id: "price_1PMSpH03DZVnzjSRLk9AWqag",
        title: "Noise Headpones",
        price: 229.99,
        currency: "USD",
        image: crusher
    },
    {
        id: "price_1PMSr103DZVnzjSRs5vEcq5J",
        title: "Push Earbuds",
        price: 63.99,
        currency: "USD",
        image: earbuds
    },
    {
        id: "price_1PMSra03DZVnzjSRGZF3luOf",
        title: "Sun Glasses",
        price: 5.98,
        currency: "USD",
        image: sunglass

    },
]

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id)

    if(productData == undefined){
        console.log("Product data does not exist", + id)
        return undefined
    }

    return productData
}

export { productsArray, getProductData }