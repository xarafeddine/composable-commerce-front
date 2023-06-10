import confetti from "canvas-confetti";

export const runFireworks = () => {
  var duration = 5 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};

// [
//   {
//     "id": 21,
//     "title": "Apple iPhone 11",
//     "image": "/images/products/iphone/iphone3.jpeg",
//     "price": 760,
//     "category": "Featured Products"
//   },

//   {
//     "id": 22,
//     "title": "Sony WH-CH510",
//     "image": "/images/products/headphone/headphone2.jpeg",
//     "price": 265,
//     "category": "Special Products"
//   },
//   {
//     "id": 21,
//     "title": "Apple iPhone 11",
//     "image": "/images/products/iphone/iphone2.jpeg",
//     "price": 850,
//     "category": "Special Products"
//   },
//   {
//     "id": 21,
//     "title": "Apple iPhone 11",
//     "image": "/images/products/iphone/iphone4.jpeg",
//     "price": 290,
//     "category": "Featured Products"
//   },
//   {
//     "id": 22,
//     "title": "Sony WH-CH510",
//     "image": "/images/products/headphone/headphone3.jpeg",
//     "price": 250,
//     "category": "Special Products"
//   },

//   {
//     "id": 22,
//     "title": "Sony WH-CH510",
//     "image": "/images/products/headphone/headphone4.jpeg",
//     "price": 365,
//     "category": "Featured Products"
//   },

//   {
//     "id": 10,
//     "title": "Apple iPhone 11 Pro",
//     "image": "/images/products/iphone/iphone5.jpeg",
//     "price": 385,
//     "category": "Special Products"
//   },
//   {
//     "id": 22,
//     "title": "Sony WH-CH510",
//     "image": "/images/products/headphone/headphone6.jpeg",
//     "price": 475,
//     "category": "Special Products"
//   },
//   {
//     "id": 21,
//     "title": "Apple iPhone 11",
//     "image": "/images/products/iphone/iphone6.jpeg",
//     "price": 800,
//     "category": "Trending Products"
//   },
//   {
//     "id": 22,
//     "title": "Sony WH-CH510",
//     "image": "/images/products/headphone/headphone7.jpeg",
//     "price": 850,
//     "category": "Special Products"
//   },

//   {
//     "id": 22,
//     "title": "Sony WH-CH510",
//     "image": "/images/products/headphone/headphone7.jpeg",
//     "price": 360,
//     "category": "Trending Products"
//   },
//   {
//     "id": 22,
//     "title": "Sony WH-CH510",
//     "image": "/images/products/headphone/headphone5.jpeg",
//     "price": 320,
//     "category": "Special Products"
//   },
//   {
//     "id": 22,
//     "title": "Sony WH-CH510",
//     "image": "/images/products/headphone/headphone8.jpeg",
//     "price": 305,
//     "category": "Trending Products"
//   },
//   {
//     "id": 23,
//     "title": "Samsung Galaxy",
//     "image": "/images/products/sumsung/samsung6.jpeg",
//     "price": 400,
//     "category": "Special Products"
//   },
//   {
//     "id": 23,
//     "title": "Samsung Galaxy",
//     "image": "/images/products/sumsung/samsung5.jpeg",
//     "price": 550,
//     "category": "Trending Products"
//   },
//   {
//     "id": 21,
//     "title": "Apple iPhone 11",
//     "image": "/images/products/iphone/iphone1.jpeg",
//     "price": 300,
//     "category": "Special Products"
//   },
//   {
//     "id": 22,
//     "title": "Sony WH-CH510",
//     "image": "/images/products/headphone/headphone9.jpeg",
//     "price": 630,
//     "category": "Trending Products"
//   },
//   {
//     "id": 23,
//     "title": "Samsung Galaxy",
//     "image": "/images/products/sumsung/samsung4.jpeg",
//     "price": 270,
//     "category": "Special Products"
//   },
//   {
//     "id": 22,
//     "title": "Sony WH-CH510",
//     "image": "/images/products/headphone/headphone10.jpeg",
//     "price": 250,
//     "category": "Trending Products"
//   },
//   {
//     "id": 22,
//     "title": "Sony WH-CH510",
//     "image": "/images/products/headphone/headphone1.jpeg",
//     "price": 265,
//     "category": "Special Products"
//   },
//   {
//     "id": 23,
//     "title": "Samsung Galaxy",
//     "image": "/images/products/sumsung/samsung2.jpeg",
//     "price": 500,
//     "category": "Featured Products"
//   },
//   {
//     "id": 22,
//     "title": "Sony WH-CH510",
//     "image": "/images/products/headphone/headphone11.jpeg",
//     "price": 700,
//     "category": "Trending Products"
//   },

//   {
//     "id": 23,
//     "title": "Samsung Galaxy",
//     "image": "/images/products/sumsung/samsung1.jpeg",
//     "price": 450,
//     "category": "Special Products"
//   },
//   {
//     "id": 23,
//     "title": "Samsung Galaxy",
//     "image": "/images/products/sumsung/samsung3.jpeg",
//     "price": 460,
//     "category": "Trending Products"
//   },
//   {
//     "id": 22,
//     "title": "Sony WH-CH510",
//     "image": "/images/products/headphone/headphone12.jpeg",
//     "price": 600,
//     "category": "Featured Products"
//   }
// ]
