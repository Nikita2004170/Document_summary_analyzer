import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

const registerUser = async (req, res, next) => {
    //steps
    //check validation
    //check if user exists
    //if exists send error
    //if not create user
    //send response
    console.log(req.body);

    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "username or email or password are required",
                success: false,
            });
        }
        const existingUser = await User.findOne({
            $or: [{ email }, { name }]
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user already exist",
            })
        }
        const user = await User.create({
            name, email, password
        });
        // await user.save();
        if (!user) {
            return res.status(500).json({
                success: false,
                message: "user not created",
            })
        }
        return res.status(201).json({
            success: true,
            message: "user created successfully",
            user,
        });


    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "internal server error",
            err: err.message,
        });
    }
}
const generateAccessTokenandRefreshToken = async (userId) => {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
};

//step
//check if email and password is present
//check if user exits
//check if password correct
//store refresh token in db
//generate access token and refresh token
//send response
console.log("in user controller");

const loginUser = async (req, res) => {
console.log("in login user 1");


    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            });
        }
        console.log("in login user 3");

        //  const isPasswordValid = await bcrypt.compare(password, user.password);
        // console.log("is password valid", isPasswordValid);
        const isPasswordValid = await user.isPasswordCorrect(password);
        console.log("is password valid", isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "password not correct"
            });
        }

        const { accessToken, refreshToken } = await generateAccessTokenandRefreshToken(user._id);
        console.log("in login user 5");

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const option = {
            httpOnly: true,
            secure: true,
        };

        return res.status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json({
                success: true,
                message: "Login successful",
                user: loggedInUser
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            //err: err.message,
        });

    }
};
//steps
//check if user is logged in
//remove refresh token from db
//clear cookies
//send response
const logoutUser = async (req, res) => {
    console.log("in login user 4");
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: { refreshToken: 1 }
            },
            {
                new: true,
            }
        )
        const option = {
            httpOnly: true,
            secure: true,
        };
        return res.status(200)
            .clearCookie("accessToken", option)
            .clearCookie("refreshToken", option)
            .json({
                success: true,
                message: "Logout successful",
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            err: err.message,
        })

    }

}
export { registerUser, loginUser, logoutUser };