const express = require("express");
const router = express.Router();
const user = require("../models/User");

const {login, signup} = require("../controllers/Auth");
const {auth, isStudent,isAdmin} = require("../middlewares/auth");
const User = require("../models/User");

router.post("/login", login);
router.post("/signup", signup);

//testing protected routes for single middleware
router.get("/test", auth, (req,res) =>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for TESTS',
    });
});

//Protected Route
router.get("/student", auth, isStudent, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Students',
    });
} );

router.get("/admin", auth, isAdmin, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Admin',
    });
});

//fetching all the data by using Id
router.get("/getEmail", auth, async (req, res) => {
    try{
        const id = req.user.id;
        const user = await User.findById(id);

        res.status(200).json({
            success:true,
            user:user,
            message:'User fetched successfully',
        });

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            error:error.message,
            message:'Something went wrong while fetching email',
        });
    }
})

module.exports = router;