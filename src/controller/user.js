import userModal from "../models/user.js";
import auth from "../common/auth.js";
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, password, role } = req.body;
    let user = await userModal.findOne({ email: email });
    if (!user) {
      req.body.password = await auth.hashPassword(req.body.password);
      userModal.create(req.body);
      const user = await userModal.findOne(
        { email: req.body.email },
        { _id: 0, password: 0 }
      );
      res.status(201).send({
        message: "User Created Successfully",
        user,
      });
    } else {
      res.send(400).send({
        message: `User with ${email} already exists`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    let user = await userModal.findOne({ email: req.body.email });

    if (user) {
      if (await auth.confirmPassword(req.body.password, user.password)) {
        let payload = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        };
        let token = await auth.createToken(payload);
      
      res.status(200).send({
        message: "Login Sucessfully",
        token,
        role: user.role,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      });
    }
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  } 
};

const getAllUsers = async (req, res) => {
  try {
    let allUsers = await userModal.find();
    if(allUsers) {
      res.status(200).send({
        message: 'Data Fetched Successfully', 
        allUsers
      })
    }
    else{
      res.status(404).send({
        message: 'No Data Found'
      });
    }
  } catch (error) {
      res.status(500).send({
        message: error.message || 'Internal Server Error',
        error
      })
  }
}

export default {
  signup,
  login,
  getAllUsers
};
