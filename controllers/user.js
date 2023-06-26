const db = require('../models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async(req, res) => {
    try {
        // Get user input
        const { role, name, email, password } = req.body;

        // Validate user input
        if (!role || !name || !email || !password) {
            return res.status(400).json({
                msg: "Please fill all the fields"
            });
          } 
        
        // Validate email 
        if(email) {
            const validatedEmail = isEmailValid(email);
            if(!validatedEmail) {
                return res.json({
                    msg: "Invalid Email"
                })
            }
        }

        // Check password length 
        if(password && password.length > 8) {
            return res.json({
                msg: "Password cannot exceeds 8 characters"
            })
        }

        // Check if user already exists 
        const oldUser = await db.user.findOne({
            where: { email: email.toLowerCase() }
        });

        // User exists
        if(oldUser) {
            return res.json({
                msg: "User already exist. Please provide unique email id."
            })
        }

        // Hash Password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create User
        const newUser = await db.user.create({ role, name, email: email.toLowerCase() , password: hashPassword });
        return res.status(200).json({
            msg: "user created",
            user: newUser
        })
            
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

exports.loginUser = async(req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if ( !email || !password ) {
            return res.status(400).json({
                msg: "Please fill all the fields"
            });
          }

        // Validate email
        if(email) {
            const validatedEmail = isEmailValid(email);
            // console.log("++++++++", validatedEmail);
            if(!validatedEmail) {
                return res.json({
                    msg: "Invalid Email"
                })
            }
        }

        // Checking if user exists
        const user = await db.user.findOne({ 
            where: {
                email: email.toLowerCase()
            }
        });
        if(!user) return res.status(400).json({ msg: "Incorrect email-id"});

        // Checking if password matches
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).json({ msg: "Incorrect password"});

        // Sending back the token
        const token = jwt.sign({ id: user.id}, process.env.TOKEN_SECRET);
        res.header("auth-token", token).json({
            msg: "Login successful",
            token
         });
        
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

exports.gettingUsers = async(req, res) => {
    try {
        const users = await db.user.findAll({
            order: ['createdAt'],
        })
        return res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

exports.getUser = async(req, res) => {
    try {
        const getUser = await db.user.findOne({
            where: {id: req.params.id},
        });

        // User not found
        if(!getUser) {
            return res.status(404).json({ msg: "User  not found" });
        // Found
        } else {
            return res.status(200).json({
                user: getUser
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: error.message
        });
    }
}

exports.updateUser = async(req, res) => {
    try {
        // Get user from db
        const getUserToBeUpdated = await db.user.findOne({
            where: {id: req.params.id}
        });

        // User not found
        if(!getUserToBeUpdated) {
            return res.status(404).json({
                msg: "This user does not exist."
            });
        // Found
        } else {
            const { role, name, email, password } = req.body;

            // Validate email 
            if(email) {
                const validatedEmail = isEmailValid(email);
                if(!validatedEmail) {
                    return res.json({
                        msg: "Invalid Email"
                    })
                }
            }

            // Check password length 
            if(password && password.length > 8) {
                return res.json({
                    msg: "Password cannot exceeds 8 characters"
                })
            }

            // Hash Password using bcrypt
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            // Update
            const updatedUser = await getUserToBeUpdated.update({ role, name, email, password: hashPassword });
            return res.status(200).json({
                msg: "User updated successfully",
                user: updatedUser
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

exports.deleteUser = async(req, res) => {
    try {
        // Find user
        const getUserToBeDeleted = await db.user.findOne({
            where: {id: req.params.id}
        });
        // User not found
        if(!getUserToBeDeleted) {
            return res.status(404).json({
                msg: "User does not exist"
            });
        // Found
        } else {
            const removeUser = await db.user.destroy({
                where: { id: req.params.id }
            });
            console.log("deleted")
            return res.json({
                msg: "User deleted"
        })
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        }
        );
    }
}

// Email Validation
function isEmailValid(email) {
    let validRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi
    if(email.toLowerCase().match(validRegex)) {
        return true;
    } else {
        return false;
    }
}