const { Thought, User, Reaction} = require('../../models');
const router = require('express').Router()

//create new thought
router.post("/thought", async (req, res) => {
  try{
    const newThought = await Thought.create( req.body )
    const insert= await User.findOneAndUpdate(
      { _id:req.body.userId}, 
      {$push:{thoughts:newThought._id}},
      {new:true}
    )
    console.log(insert)
    res.status(200).json(insert)
  }catch(err){
    console.log(err)
    res.status(500).json(err);
  }
});

//get all thoughts
router.get('/',async(req,res)=>{
  try{
    const allThoughts=await Thought.find()
    res.status(200).json(allThoughts)
    
  }catch(err){
    console.log(err)
    res.status(500).json(err);
  }
});

//delete thought
router.delete('/:id', async (req, res) => {
  try{
    const deleted = await Thought.findByIdAndDelete( req.params.id )
    res.status(200).json(deleted);
  }catch(err){
    console.log(err)
    res.status(500).json(err);
  }
});

//Get individual thought
router.get('/:id',async(req,res)=>{
  try{
    const all=await Thought.findById(req.params.id)
    res.status(200).json(all)
  }catch(err){
    res.status(500).json(err);
  }
})

//Update thought
router.put("/:id", async (req, res) => {
  try{
    const update = await Thought.findByIdAndUpdate(
       req.params.id , 
       req.body,
      { new: true },
    )
    console.log(update)
    res.status(200).json(update)
  }catch(err){
    res.status(500).json(err);
  }
});

//New Reaction
router.post('/:thoughtId/reaction',async(req,res)=>{
  try{
    const newReaction =await Thought.findOneAndUpdate(
    {_id:req.params.thoughtId},
    {$push:{reactions:req.body}},
    {new:true}
    )
    res.status(200).json(newReaction);
  }catch(err){
      console.log(err)
      res.status(500).json(err);
  }
})

//Delete Reaction
router.delete('/:thoughtId/reaction/:reactionId',async(req,res)=>{
  try{
    const deleteReaction =await Thought.findOneAndUpdate(
      {_id:req.params.thoughtId},
      {$pull:{reactions:{reactionId: req.params._id}}},
      {new:true}
    
    )
    res.status(200).json(delFriend);
  }catch(err){
    console.log(err)
    res.status(500).json(err);
  }
})

module.exports = router;