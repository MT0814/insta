const db = require('../config/connection');
const { User, Thought, Photo } = require('../models');
const userSeeds = require('./userSeeds.json');
const thoughtSeeds = require('./thoughtSeeds.json');
const photoSeeds = require('./photoSeeds.json');

db.once('open', async () => {
  try {
    await Thought.deleteMany({});
    // await Photo.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds, photoSeeds);
    // await User.create(photoSeeds);

    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
   
    // for (let i = 0; i < photoSeeds.length; i++) {
    //   const { _id, photoFile } = await Photo.create(photoSeeds[i]);
    //   const user = await User.findOneAndUpdate(
    //     { username: photoFile },
    //     {
    //       $addToSet: {
    //         photos: _id,
    //       },
    //     }
    //   );
    // }

  } catch (err) {
    console.error(err);
    process.exit(1);
  };

  

  console.log('all done!');
  process.exit(0);
});


// [
//   {
      
//     "photoFile": "../images/meow.png"
//   },
//   {
//       "photoFile": "../images/rose.jpg"
//   },
//   {
//       "photoFile": "../images/sophie1.jpeg"
//   },
//   {
    
//       "photoFile": "../images/sophie2.jpeg"
//   },
//   {      
//       "photoFile": "../images/woman.png"
//   }
// ]