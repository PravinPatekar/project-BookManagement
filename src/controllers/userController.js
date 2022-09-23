const userModel = require("../models/userModel");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};


const registerUser = async function (req, res) {
  try {
    if (Object.keys(req.query).length === 0) {
      
      const data = req.body;
//================ if no data is provided in body ================================
      if (Object.keys(data).length == 0) {
        return res.status(400).send({
          status: false,
          message: "Please Provide Required Data To Create User !!",
        });
      }
      let { title, name, phone, email, password, address } = data;

      
    
      //================== if title is not valid=============
      if (isValid(title) == false) {
        return res.status(400).send({
          status: false,
          msg: "title is required",
        });
      }

      const titleEx = ["Mr", "Mrs", "Miss"];
      const isValidTitle = titleEx.includes(title);
      if (isValidTitle == false) {
        return res.status(400).send({
          status: false,
          msg: "enter valid title like -> Mr , Mrs ,Miss",
        });
      }
      //============================== if name is not entered in body ================================
      if (!name) {
        return res
          .status(400)
          .send({ status: false, message: "Name is mandatory !!" });
      }
      if (!name.trim()) {
        return res.status(400).send({
          status: false,
          message: `Name can not be  an empty string !!`,
        });
      }
      //================================ to check the name format =======================================
      let Name = /^[a-zA-Z\s]+$/.test(name);
      if (!Name) {
        return res.status(400).send({
          status: false,
          message: `${name} can be in alphabets only !!`,
        });
      }
    
      //================================ phone is mandatory =========================================
      if (!phone) {
        return res
          .status(400)
          .send({ status: false, message: "phone is mandatory !!" });
      }
      if(!phone.trim()){
        return res.status(400)
        .send({status:false, message:"phone number field cannot be an empty string!!"})
      }
      //=============================== to check the phone no. format =================================
      let phoneValid = /^[6-9]\d{9}$/.test(phone);
      if (!phoneValid) {
        return res.status(400).send({
          status: false,
          message: `${phone} is not a valid phone Number !!`,
        });
      }
      //================================= duplicate phone number ========================================
      let checkphone = await userModel.findOne({ phone: phone });
      if (checkphone) {
        return res
          .status(400)
          .send({ status: false, message: `${phone} already exists !!` });
      }
      //================================== email is mandatory ===========================================
      if (!email) {
        return res
          .status(400)
          .send({ status: false, message: "E-mail is mandatory !!" });
      }
      //================================== to check the email format ===================================
      let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(
        email
      );
      if (!emailValid) {
        return res.status(400).send({
          status: false,
          message: `${email} is not a valid E-mail !!`,
        });
      }
      //================================ duplicate email =====================================================
      let checkEmail = await userModel.findOne({ email: email });
      if (checkEmail) {
        return res
          .status(400)
          .send({ status: false, message: `${email} already exists !!` });
      }

      //=================== password is mandatory========================
      if (!password) {
        return res
          .status(400)
          .send({ status: false, message: "password is mandatory !!" });
      }
      //================ min 8 length password ===============
      if (
        !/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(
          password
        )
      ) {
        return res.status(400).send({
          status: false,
          msg: "Please enter Minimum 8 characters or maximum 15 character, at least one uppercase letter, one lowercase letter, one number and one special character",
        });
      }
      //=================== user address=====================
      console.log('address' in data)
      const { street, pincode, city } = address;

      //========================== check valid pincode====================
      if (!/^[1-9]{1}[0-9]{5}$/.test(pincode)) {
        return res.status(400).send({
          status: false,
          message: `${pincode}enter valid picode of 6 digit and which do not start with 0`,
        });
      }
  
      let City = /^[a-zA-Z\s]+$/.test(city);
      if (!City) {
        return res.status(400).send({
          status: false,
          message: `${city} can be in alphabets only !!`,
        });
      }
      //========================== create user=============
      req.body.name = name.replace(/\s+/g, " ");
      const userData = await userModel.create(data);
      return res.status(201).send({
        status: true,
        message: "successfully saved user data",
        data: userData,
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "Invalid request,do not provide data in query params !!",
      });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};



const login = async function (req, res) {
  try {
    const data = req.body;

    if (isValid(data.email) == false) {
      return res.status(400).send({
        status: false,
        msg: "email is required",
      });
    }
    if (isValid(data.password) == false) {
      return res.status(400).send({
        status: false,
        msg: "passord is required",
      });
    }


    let isValidEmail = validator.isEmail(data.email);
    if (isValidEmail == false) {
      return res.status(400).send({
        status: false,
        msg: "plz enter valid email",
      });
    }

    const user = await userModel.findOne({
      email: data.email,
      password: data.password,
    });

    if (!user) {
      return res.status(401).send({
        status: false,
        msg: "email or password is not carrect",
      });
    }

    let token = jwt.sign(
      {
        userId: user._id
      },
      "Project 3 Bookmanagement Group-49",
      {expiresIn: "60h"}
    
    );

    res.setHeader("x-auth-token", token);
    return res.status(200).send({ status: true, data: token });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

module.exports.registerUser = registerUser;
module.exports.login = login;