const router = require('express').Router();
const { User } = require('../../models');


//get all users
router.get('/', async (req, res) =>{
  try{
    const profile = await User.find()
    res.json(profile);
  }catch(err){
    res.json(err).status(400)
  }
})

//get one user
router.get("/:id", async(req,res) =>{
  try{
      const singleUser = await User.findById(req.params.id);
      res.json(singleUser).status(200);
  }catch(err){
      res.json(err).status(400);
  }
});

//new user route
router.post("/", async(req,res) =>{
  try{
      const newUser = await User.create({...req.body})
      console.log(newUser)
      res.json(newUser).status(200);
  }catch(err){
      res.json(err).status(400);
  }
});


//update user route
router.put("/:id", async(req,res)=>{
  try{
      const userUpdate = await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          {new: true}
      )
      res.json(userUpdate).status(200);
  }catch(err){
      res.json(err).status(400);
  }
});

//Delete user route
router.delete("/:id", async(req,res)=>{
  try{
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      res.json(deletedUser).status(200);
  }catch(error){
      res.json(err).status(400);
  }
});

//Friend add route
router.post("/:userId/friends/:friendId", async(req,res) =>{
  try{
      const ogUser = await User.findById(req.params.userId);
      const newFriend = await User.findById(req.params.friendId);
      ogUser.friends.push(newFriend);
      const result = await ogUser.save();
      res.json(result).status(200);
  }catch(err){
      res.json(err).status(400);
  }
});

//Delete Friend
router.delete("/:userId/friends/:friendId", async(req,res)=>{
  try{
      const ogUser = await User.findOneAndUpdate(
      {_id: req.params.userId},
      {$pull:{friends:req.params.friendId}},
      {new: true}
      );
      res.json(result).status(200);
  }catch(err){
      res.json(err).status(400);
      console.log(err)
  }
});

module.exports = router;
