const { Jimp } = require("jimp");

async function run() {
  const image = await Jimp.read("public/logo.png");
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // Check how red it is compared to green/blue
    // The rose color has higher R than G and B.
    // The checkerboard has R ~ G ~ B.
    
    const isGrayscale = (r - Math.max(g, b)) < 25;
    
    if (isGrayscale) {
      this.bitmap.data[idx + 3] = 0; // Set alpha to 0
    } else {
      // It's the rose logo color. We might want to remove the white background mixed in with anti-aliasing.
      // But keeping it as is might be fine.
    }
  });

  image.write("public/logo.png", () => {
    console.log("Logo processed successfully.");
  });
}

run().catch(console.error);

run().catch(console.error);
