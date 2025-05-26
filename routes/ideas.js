// const ideas = [
  //   {
//     id: 1,
//     text: 'Positive Newsletter, a newsletter that only shares positive, uplifting news',
//     tag: 'Technology',
//     username: 'Tony Stark',
//     date: '2022-01-02',
//   },
//   {
  //     id: 2,
//     text: 'A paragraph about some random thoughts I had last week',
//     tag: 'Journal',
//     username: 'Laney Stark',
//     date: '2022-01-02',
//   },
//   {
  //     id: 3,
//     text: 'Not walking through a gail store on the mountain',
//     tag: 'Adventure',
//     username: 'Mary Stark',
//     date: '2022-01-02',
//   },
// ];

const express = require('express');
const router = express.Router();  // Using router, not app
const Idea = require('../models/Idea');

// Get all Ideas
router.get('/', async (req, res) => {
try {
  const ideas = await Idea.find();
  res.json({ success: true, data: ideas });
} catch (error) {
  console.log(error);
  res.status(500).json({ success: false, error: 'Something went wrong'});
}
});

// Get single idea
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, error: 'Something went wrong'});
  }
});

//Add an idea
router.post('/', async (req, res) => {
const idea = new Idea ({
  text: req.body.text,
  tag: req.body.tag,
  username: req.body.username,
});

try {
  const savedIdea = await idea.save();
  res.json({success:true, data:savedIdea});
} catch (error) {
  console.log(error);
  res.status(500).json({success: false, error: 'Something went wrong'});
}
})

//update idea
// router.put('/:id', async (req, res) => {
//  try {
//  const idea = await Idea.findById(req.params.id);

//  if (idea.username === req.body.username) {    
//   const updatedIdea = await Idea.findByIdAndUpdate(
//   req.params.id, 
//   {
//     $set: {
//       text: req.body.text,
//       tag: req.body.tag
//     }
//   }, {new: true});}

//  return res.json({success: true, data: updatedIdea});
//  } catch (error) {
//   console.log(error);
//   res.status(500).json({success: false, error: 'Something went wrong'});
//  }
// });
router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
  
  //match the usernames
    if (idea.username === req.body.username) {
     const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
        },
      },
      { new: true }
    );

    return res.json({ success: true, data: updatedIdea });   
     }
    
  //usernames do not match
res.status(403).json({success:false,error: 
  'You are not authorized to update this resource'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 
      'Something went wrong' });
  }
});


//delete idea
router.delete('/:id', async (req, res) => {
try {
  const idea = await Idea.findById(req.params.id);

  //match the usernames
  if (idea.username === req.body.username) {
    await Idea.findByIdAndDelete(req.params.id);
    return res.json({ success: true, data: {} });
  }
  
  //usernames do no match
  return res.status(403).json({success:false, error: 
    'You are not authorized to delete this resource'
  });
 } catch (error) {
    console.log(error);
    res.status(500).json({success:false, error: 
      'Something went wrong'});
    }
});

module.exports = router;  // Export router, not app

