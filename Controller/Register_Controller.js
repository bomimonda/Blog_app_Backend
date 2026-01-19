
import User from "../Model/RegistrationSchema.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import express from "express";


cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret, 
});



export const Getuser = async (req, res) => {
  let { email, password } = req.body;

  console.log("Change query");
  console.log(req.body);


  try {
    if (email.includes("@")) {
      const students = await User.findOne({
        email: email,
      });

 if (students) {
        let user1 = await bcrypt.compare(password, students.password);
        console.log("user");

        if (user1) {
          res.json({
            success: true,
            token: await students.Token(),
            data: students,
          });
        } else {
          res.status(400).json({
            success: false,
            status: 400,
            message: "Please enter correct password",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          status: 400,
          message: "User not Found",
        });
      }


   
      
    } else {
      const students = await User.findOne({
        Username: email,
      });

      console.log("students1");
      console.log(students);
      if (students) {
        let user1 = await bcrypt.compare(password, students.password);
        console.log("user");

        if (user1) {
          res.json({
            success: true,
            token: await students.Token(),
            data: students,
          });
        } else {
          res.status(400).json({
            success: false,
            status: 400,
            message: "Please enter correct password",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          status: 400,
          message: " User not Found",
        });
      }

   
    }
  } catch (err) {
    res.status(500).json({ message: "Not Found" });
  }
};

export const Setuser = async (req, res) => {
 

  

  const { Username, email, password ,Image,Title,Location,Phone,Organization,checked,skills} = req.body;
 
  

 
  

  try {
   if (password.length>=8) {
      let changepassword = await bcrypt.hash(password, 10);
       let newUser = new User({ Username, email, password: changepassword,Image:Image,Title,Location,Phone,Organization,checked,skills });
    await newUser.save();

    console.log("data");

    res.status(200).json(newUser)
  

    res.status(201).json({
      success: true,
      data: newUser,
    });
   }else{
     res.status(350).json({
        errors:"Password length will be minimum 8",
        success: false,
        status: 400,
      });
   }
  } catch (error) {
  //   console.log("error");

    if (error.name === "ValidationError") {
      const errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      res.status(400).json({
        errors,
        success: false,
        status: 400,
      });
    }
 
  }

  
};

export let tokenverify = async (req, res) => {
  try {
    let userdata = req.user;
    console.log(`gtyu ${req.user}`);
   if (req.user!=="Token expire") {
     res.status(200).json({
      message: userdata,
    });
   }
    res.status(400).json({
      message: "Token expire",
    });
  } catch (error) {}
};
