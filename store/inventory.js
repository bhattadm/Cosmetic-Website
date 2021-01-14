const inventoryList = {
  "1": {
    itemId: "1",
    itemName: "Lipstick",
    price: 26.00,
    quantity: 3,
    "image":{
        "url":"./images/lipstick.jpg",
    },
    comments:[{
      sender:"Rebecca",
      text:"I love this lipstick and the color! "
    }]
  },
  "2": {
    itemId: "2",
    itemName: "Palette",
    price: 30.00,
    quantity: 5,
    image:{
      "url":"./images/palette.jpg",
    },
    comments:[{
      sender:"Jess",
      text:`I love the colors, the pigmentation, the quality, and the accompanying brush. I’m thrilled. The colors actually vary from the practical to the very fun which is fitting for my lifestyle.`
    }]
  },
  "3": {
    itemId: "3",
    itemName: "Blush",
    price: 20.00,
    quantity: 15,
    image:{
      "url":"./images/blush.jpg",
    },
    comments:[{
      sender:"Amita",
      text:"Wow, I Love it! "
    }]
  },
  "4": {
    itemId: "4",
    itemName: "Kajal",
    price: 18.00,
    quantity: 20,
    image:{
      "url":"./images/kajal.jpg",
    },
    comments:[{
      sender:"Saloni",
      text:`Itz smugged alot like within an hour... Not even long lasting,intensity is also not that good.`
    }]
  },
  "5": {
    itemId: "5",
    itemName: "Mascara",
    price: 12.50,
    quantity: 30,
    image:{
      "url":"./images/mascara.jpg",
    },
    comments:[{
      sender:"Cobalt",
      text:"It's not a product that works for me."
    }]
  },
  "6": {
    itemId: "6",
    itemName: "BrushSet",
    price: 65.00,
    quantity: 30,
    image:{
      "url":"./images/brushSet.jpg",
    },
    comments:[{
      sender:"Gemyi",
      text:`These brushes are amazing. They are so soft and no hanging bristles. Added a picture makeup done using these brushes. Absolutely in love with them. `
    }]
  },
  "7": {
    itemId: "7",
    itemName: "NailPolish",
    price: 40.00,
    quantity: 10,
    image:{
      "url":"./images/nailPolish.jpg",
    },
    comments:[{
      sender:"Sara",
      text:"I highly recommend these"
    }]
  },
  "8": {
    itemId: "8",
    itemName: "Cream",
    price: 52.00,
    quantity:10,
    image:{
      "url":"./images/cream.jpg",
    },
    comments:[{
      sender:"Sana",
      text:"I just can't quit playing with them! I am in love for real."
    }]
  },
  "9": {
    itemId: "9",
    itemName: "Powder",
    price: 58.00,
    quantity:9,
    image:{
      "url":"./images/powder.jpg",
    },
    comments:[{
      sender:"Vee",
      text:'I love this!! I’m a setting powder junkie & always looking for something better. This beats all of my high end powders'
    }]
  }
};
  
function updateStock(itemId, quantityadded) {   
  inventoryList[itemId].quantity = parseInt(inventoryList[itemId].quantity) + parseInt(quantityadded);  
}

const addComment= function(itemId, sender, text) {
  inventoryList[itemId].comments.push({ sender, text });
}

const inventory = {
  inventoryList,
  updateStock,
  addComment,
};

module.exports = inventory;