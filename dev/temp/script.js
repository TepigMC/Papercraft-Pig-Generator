////////////////////////////////////////////////////////////////////////////////
//
// MINECRAFT PIG PAPERCRAFT GENERATOR 
//
//            ,.                      
//           (_|,.                    
//          ," /, )_______   _        
//       __j o``-"        `."-)"      
//      (")                 \"        
//       `-j                |         
//         `-._(           /          
//            |_\  |--^.  /           
//           /_]"|_| /_)_/            
//              /_]"  /_]"            
//
// Created by TepigMC
//
// 06 Feb 2015 lostminer: Add user variables
// 13 Feb 2015 lostminer: Update to use new version of generator
// 25 Feb 2015 TepigMC: Modified images; Fix drawing errors
// 26 Feb 2015 TepigMC: Removed missing texture checks; Rename files
// 27 Feb 2015 TepigMC: Compacted backgrounds and folds into sprite files
// 28 Feb 2015 TepigMC: Compacted labels and titles into sprite files; Added "Advanced (Standard)" head
//                      Added "Show Helmet Overlay" option; Added texture options
//
////////////////////////////////////////////////////////////////////////////////

// Input names
var pigTexture = "Pig";
var saddleTexture = "Saddle";
var armorTexture = "Armor (Layer 1)";
var backgroundSprite = "Background Sprite";
var foldSprite = "Fold Sprite";
var labelSprite = "Label Sprite";
var titleSprite = "Title Sprite";

var backgroundSprites = {
  body: { w:312, h:304, x:0, y:0 },
  boot: { w:152, h:104, x:280, y:504 },
  headAdvanced: { w:296, h:176, x:0, y:304 },
  headSimple: { w:280, h:192, x:312, y:200 },
  headStandardAdvanced: { w:280, h:200, x:312, y:0 },
  helmet: { w:280, h:128, x:0, y:480 },
  leg: { w:152, h:160, x:440, y:392 },
  nose3D: { w:80, h:80, x:296, y:392 },
  opaque: { w:32, h:32, x:296, y:472 },
  ultraMini: { w:36, h:28, x:328, y:472 }
};

var foldSprites = {
  body: { w:312, h:304, x:0, y:0 },
  boot: { w:152, h:104, x:448, y:448 },
  headAdvanced: { w:296, h:176, x:0, y:632 },
  headAdvancedCuts: { w:296, h:176, x:304, y:632 },
  headSimple: { w:280, h:192, x:320, y:256 },
  headStandardAdvanced: { w:280, h:200, x:0, y:304 },
  helmet: { w:280, h:128, x:0, y:504 },
  leg: { w:152, h:160, x:280, y:448 },
  nose3D: { w:80, h:80, x:432, y:552 },
  saddle: { w:288, h:256, x:312, y:0 }
};

var labelSprites = {
  bodyHead: { w:64, h:48, x:0, y:0 },
  bodyLeg1: { w:32, h:32, x:128, y:0 },
  bodyLeg2: { w:32, h:32, x:160, y:0 },
  bodyLeg3: { w:32, h:24, x:128, y:32 },
  bodyLeg4: { w:32, h:24, x:160, y:32 },
  head: { w:64, h:48, x:64, y:0 },
  headNose3D: { w:32, h:24, x:128, y:56 },
  headStandardAdvanced: { w:16, h:48, x:192, y:0 },
  leg1: { w:32, h:32, x:0, y:48 },
  leg2: { w:32, h:32, x:32, y:48 },
  leg3: { w:32, h:32, x:64, y:48 },
  leg4: { w:32, h:32, x:96, y:48 },
  nose3D: { w:32, h:24, x:160, y:56 }
};

var titleSprites = {
  body: { w:46, h:16, x:34, y:30 },
  boot: { w:42, h:14, x:44, y:16 },
  head: { w:46, h:14, x:138, y:0 },
  helmet: { w:60, h:14, x:184, y:0 },
  leg: { w:34, h:16, x:0, y:23 },
  nose3D: { w:46, h:14, x:244, y:0 },
  pixelPapercraft: { w:208, h:34, x:86, y:14 },
  saddle: { w:64, h:14, x:74, y:0 },
  tepigmc: { w:74, h:16, x:0, y:0 },
  ultraMini: { w:44, h:7, x:0, y:16 }
};


var shapes = {
  headAdvanced: [
    {texture: {x:0,  y:8,  w:8, h:2}, page: {x:0,   y:64,  w:64, h:16}}, // Right 1
    {texture: {x:2,  y:10, w:6, h:6}, page: {x:16,  y:80,  w:48, h:48}}, // Right 2
    {texture: {x:8,  y:8,  w:8, h:8}, page: {x:64,  y:64,  w:64, h:64}}, // Face
    {texture: {x:16, y:8,  w:8, h:2}, page: {x:128, y:64,  w:64, h:16}}, // Left 1
    {texture: {x:16, y:10, w:6, h:6}, page: {x:128, y:80,  w:48, h:48}}, // Left 2
    {texture: {x:8,  y:0,  w:8, h:8}, page: {x:64,  y:0,   w:64, h:64}}, // Top
    {texture: {x:16, y:0,  w:8, h:6}, page: {x:64,  y:128, w:64, h:48}}, // Bottom
    {texture: {x:24, y:8,  w:8, h:2}, page: {x:192, y:64,  w:64, h:16}}, // Back 1
    {texture: {x:24, y:10, w:8, h:6}, page: {x:176, y:80,  w:64, h:48}}, // Back 2
    {texture: {x:24, y:10, w:8, h:2}, page: {x:0,   y:144, w:64, h:16}, transform: {rotate:270}} // Back 3
  ],
  headStandardAdvanced: [
    {texture: {x:0,  y:8,  w:8, h:2}, page: {x:0,   y:64,  w:64, h:16}}, // Right 1
    {texture: {x:2,  y:10, w:6, h:6}, page: {x:16,  y:80,  w:48, h:48}}, // Right 2
    {texture: {x:8,  y:8,  w:8, h:8}, page: {x:64,  y:64,  w:64, h:64}}, // Face
    {texture: {x:16, y:8,  w:8, h:2}, page: {x:128, y:64,  w:64, h:16}}, // Left 1
    {texture: {x:16, y:10, w:6, h:6}, page: {x:128, y:80,  w:48, h:48}}, // Left 2
    {texture: {x:8,  y:0,  w:8, h:8}, page: {x:64,  y:0,   w:64, h:64}}, // Top
    {texture: {x:16, y:0,  w:8, h:6}, page: {x:64,  y:128, w:64, h:48}}, // Bottom
    {texture: {x:24, y:8,  w:8, h:2}, page: {x:192, y:64,  w:64, h:16}}  // Back 1
  ],
  headSimple: [
    {texture: {x:0,  y:8, w:8, h:8}, page: {x:0,   y:64,  w:64, h:64}}, // Right
    {texture: {x:8,  y:8, w:8, h:8}, page: {x:64,  y:64,  w:64, h:64}}, // Face
    {texture: {x:16, y:8, w:8, h:8}, page: {x:128, y:64,  w:64, h:64}}, // Left
    {texture: {x:24, y:8, w:8, h:8}, page: {x:256, y:64,  w:64, h:64}}, // Back
    {texture: {x:8,  y:0, w:8, h:8}, page: {x:64,  y:0,   w:64, h:64}}, // Top
    {texture: {x:16, y:0, w:8, h:8}, page: {x:64,  y:128, w:64, h:64}}  // Bottom
  ],
  nose3D: [
    {texture: {x:16, y:17, w:1, h:3}, page: {x:16, y:32, w:8,  h:24}}, // Right
    {texture: {x:17, y:17, w:4, h:3}, page: {x:24, y:32, w:32, h:24}}, // Center
    {texture: {x:21, y:17, w:1, h:3}, page: {x:56, y:32, w:8,  h:24}}, // Left
    {texture: {x:10, y:12, w:4, h:3}, page: {x:24, y:0,  w:32, h:24}, transform: {rotate:"vertical"}}, // Back
    {texture: {x:17, y:16, w:4, h:1}, page: {x:24, y:24, w:32, h:8}}, // Top
    {texture: {x:21, y:16, w:4, h:1}, page: {x:24, y:56, w:32, h:8}}  // Bottom
  ],
  noseFlat: [
    {texture: {x:17, y:17, w:4, h:3}, page: {x:80, y:96,  w:32, h:24}},
  ],
  body: [
    {texture: {x:28, y:16, w:8,  h:16}, page: {x:0,   y:88,  w:64, h:128}}, // Right
    {texture: {x:36, y:16, w:10, h:16}, page: {x:64,  y:88,  w:80, h:128}}, // Bottom
    {texture: {x:46, y:16, w:8,  h:16}, page: {x:144, y:88,  w:64, h:128}}, // Left
    {texture: {x:54, y:16, w:10, h:16}, page: {x:208, y:88,  w:80, h:128}}, // Top
    {texture: {x:36, y:8,  w:10, h:8},  page: {x:64,  y:24,  w:80, h:64}}, // Front
    {texture: {x:46, y:8,  w:10, h:8},  page: {x:64,  y:216, w:80, h:64}, transform: {flip:"vertical"}} // Back
  ],
  leg: [
    {texture: {x:0,  y:20, w:4, h:6}, page: {x:0,  y:56,  w:32, h:48}}, // Right
    {texture: {x:4,  y:20, w:4, h:6}, page: {x:32, y:56,  w:32, h:48}}, // Front
    {texture: {x:8,  y:20, w:4, h:6}, page: {x:64, y:56,  w:32, h:48}}, // Left
    {texture: {x:12, y:20, w:4, h:6}, page: {x:96, y:56,  w:32, h:48}}, // Back
    {texture: {x:4,  y:16, w:4, h:4}, page: {x:32, y:24,  w:32, h:32}}, // Top
    {texture: {x:8,  y:16, w:4, h:4}, page: {x:32, y:104, w:32, h:32}}  // Bottom
  ],
  saddle: [
    // Top
    {texture: {x:41, y:16, w:5,  h:16}, page: {x:0,   y:0,w:40, h:128}}, // Bottom Left
    {texture: {x:46, y:16, w:8,  h:16}, page: {x:40,  y:0,w:64, h:128}}, // Left
    {texture: {x:54, y:16, w:10, h:16}, page: {x:104, y:0,w:80, h:128}}, // Top
    {texture: {x:28, y:16, w:8,  h:16}, page: {x:184, y:0,w:64, h:128}}, // Right
    {texture: {x:41, y:16, w:5,  h:16}, page: {x:248, y:0,w:40, h:128}},  // Bottom Right
    // Bottom
    {texture: {x:41, y:16, w:5,  h:16}, page: {x:0,   y:128, w:40, h:128}, transform: {flip:"vertical"}}, // Bottom Left
    {texture: {x:46, y:16, w:8,  h:16}, page: {x:40,  y:128, w:64, h:128}, transform: {flip:"vertical"}}, // Left
    {texture: {x:54, y:16, w:10, h:16}, page: {x:104, y:128, w:80, h:128}, transform: {flip:"vertical"}}, // Top
    {texture: {x:28, y:16, w:8,  h:16}, page: {x:184, y:128, w:64, h:128}, transform: {flip:"vertical"}}, // Right
    {texture: {x:41, y:16, w:5,  h:16}, page: {x:248, y:128, w:40, h:128}, transform: {flip:"vertical"}}  // Bottom Right
  ],
  helmetSeperate: [
    {texture: {x:0,  y:8,  w:8, h:3}, page: {x:0,   y:64, w:64, h:24}}, // Right 1
    {texture: {x:2,  y:11, w:6, h:5}, page: {x:16,  y:88, w:48, h:40}}, // Right 2
    {texture: {x:8,  y:8,  w:8, h:8}, page: {x:64,  y:64, w:64, h:64}}, // Face
    {texture: {x:16, y:8,  w:8, h:3}, page: {x:128, y:64, w:64, h:24}}, // Left 1
    {texture: {x:16, y:11, w:6, h:5}, page: {x:128, y:88, w:48, h:40}}, // Left 2
    {texture: {x:24, y:8,  w:8, h:3}, page: {x:192, y:64, w:64, h:24}}, // Back
    {texture: {x:8,  y:0,  w:8, h:8}, page: {x:64,  y:0,  w:64, h:64}}  // Top
  ],
  boot: [
    {texture: {x:0,  y:26, w:4, h:6}, page: {x:0,  y:0,  w:32, h:48}}, // Right
    {texture: {x:4,  y:26, w:4, h:6}, page: {x:32, y:0,  w:32, h:48}}, // Front
    {texture: {x:8,  y:26, w:4, h:6}, page: {x:64, y:0,  w:32, h:48}}, // Left
    {texture: {x:12, y:26, w:4, h:6}, page: {x:96, y:0,  w:32, h:48}}, // Back
    {texture: {x:8,  y:16, w:4, h:4}, page: {x:32, y:48, w:32, h:32}}  // Bottom
  ],
  ultraMiniBody: [
    {texture: {x:46, y:16, w:8,  h:16}, page: {x:0,  y:8, w:8, h:12}, transform: {flip:"vertical"}}, // Right
    {texture: {x:36, y:16, w:10, h:16}, page: {x:24, y:8, w:8, h:12}, transform: {flip:"vertical"}}, // Top
    {texture: {x:28, y:16, w:8,  h:16}, page: {x:16, y:8, w:8, h:12}, transform: {flip:"vertical"}}, // Left
    {texture: {x:54, y:16, w:10, h:16}, page: {x:8,  y:8, w:8, h:12}, transform: {flip:"vertical"}}  // Bottom
  ],
  ultraMiniLegs: [
    {texture: {x:8,  y:16, w:4,  h:4}, page: {x:24, y:8,  w:3, h:3}}, // Foot 4
    {texture: {x:8,  y:16, w:4,  h:4}, page: {x:29, y:8,  w:3, h:3}}, // Foot 3
    {texture: {x:8,  y:16, w:4,  h:4}, page: {x:24, y:16, w:3, h:3}}, // Foot 2
    {texture: {x:8,  y:16, w:4,  h:4}, page: {x:29, y:16, w:3, h:3}}  // Foot 1
  ],
  ultraMiniEnds: [
    {texture: {x:8,  y:8,  w:8,  h:8}, page: {x:8,  y:20, w:8, h:8}}, // Face
    {texture: {x:17, y:17, w:4,  h:3}, page: {x:10, y:24, w:4, h:3}}, // Nose
    {texture: {x:46, y:8,  w:10, h:8}, page: {x:8,  y:0,  w:8, h:8}, transform: {flip:"vertical"}} // Back
  ],
  ultraMiniHelmet: [
    //{texture: {x:8,  y:8,  w:8, h:8}, page: {x:8,  y:20, w:8, h:8}}, // Full Helmet
    //{texture: {x:8,  y:0,  w:8, h:2}, page: {x:8,  y:18, w:8, h:2}}, // Top
    {texture: {x:8,  y:8,  w:8, h:3}, page: {x:8,  y:20, w:8, h:3}}, // Front 1
    {texture: {x:10, y:11, w:4, h:1}, page: {x:10, y:23, w:4, h:1}}  // Front 2
  ]
}


// Function to help with defining the inputs
Generator.makeTextureInput = function(texture, width, height, choices) {
  Generator.defineInput(texture, {
    type: "texture", 
    standardWidth: width, 
    standardHeight: height,
    choices: choices
  });
};

// Define user inputs
Generator.makeTextureInput(pigTexture, 64, 32, [
  "Pig (Vanilla)","Pig (Faithful)","Pig (Space Pig)","Tepig (by Audra)","Tepig (by Elpis)"
]);
Generator.makeTextureInput(saddleTexture, 64, 32, [
  "Saddle (Vanilla)","Saddle (Faithful)","Saddle (Space Pig)"
]);
Generator.makeTextureInput(armorTexture, 64, 32, [
  "Diamond Armor (Vanilla)","Gold Armor (Vanilla)","Chainmail Armor (Vanilla)","Iron Armor (Vanilla)",
  "Diamond Armor (Faithful)","Gold Armor (Faithful)","Chainmail Armor (Faithful)","Iron Armor (Faithful)",
  "Armor (Space Pig)"
]);

/**
 * Shortcut for Generator.drawImage() with relative positioning
 * 
 * @param {string} texture The name of the texture
 * @param shape The coordinates and size to get the texture from; transform is optional
 *        syntax: [{texture: {x:#, y:#, w:#, h:#}, page: {x:#, y:#, w:#, h:#}, transform: {}]
 * @param location The coordinates to draw the texture at;
 *        syntax: {x:#, y:#}
 */
Generator.drawShape = function(texture, shape, location) {
  if (!Generator.hasImage(texture)) {
    new TypeError("texture does not exist");
    return;
  }
  if (shape.constructor !== Array) {
    if (shape.constructor === Object) {
      shape = [shape];
    }
    else {
      new TypeError("shape is not an array or object");
      return;
    }
  }
  if (!("x" in location && "y" in location)) {
    new TypeError("location does not contain coordinates");
    return;
  }
  var x = location.x;
  var y = location.y;
  var tx = ("tx" in location ? location.tx : 0);
  var ty = ("ty" in location ? location.ty : 0);
  var i;
  for (i in shape) {
    if (!("texture" in shape[i] && "page" in shape[i])) {
      console.warn(JSON.stringify(shape) + " is missing texture or shape");
      continue;
    }
    var textureObject = {
      x:tx+shape[i].texture.x,
      y:ty+shape[i].texture.y,
      w:shape[i].texture.w,
      h:shape[i].texture.h
    };
    var pageObject = {
      x:x+shape[i].page.x,
      y:y+shape[i].page.y,
      w:shape[i].page.w,
      h:shape[i].page.h
    };
    if ("transform" in shape[i]) {
      Generator.drawImage(texture, textureObject, pageObject, shape[i].transform);
    }
    else {
      Generator.drawImage(texture, textureObject, pageObject);
    }
  }
};

Generator.drawShapes = function(location, data) {
  var i;
  for (i in data) {
    var dataLocation;
    if ("location" in data[i]) {
      dataLocation = {
        x:data[i].location.x + location.x,
        y:data[i].location.y + location.y
      };
    }
    else {
      dataLocation = location;
    }
    Generator.drawShape(data[i].texture, data[i].shape, dataLocation);
  }
};

Generator.drawShapes({x:0, y:0}, [
  {texture: pigTexture, shape: shapes.body}
]);