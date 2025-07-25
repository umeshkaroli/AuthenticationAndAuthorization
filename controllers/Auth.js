const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.signup = async (req, res) => {
    try{
        //get data from request body
        const { name, email, password, role } = req.body;
        //check if user already exists
        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({ message: 'User already exists' });
        }

        //secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(error){
            return res.status(500).json({ message: 'Error hashing password' });
        }

        //create entry for new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        return res.status(200).json({ message: 'User created successfully' });

    }
    catch(error){
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'User cannot be created, Please try again later' });
    }
}