import express from "express";
import users from "../Model/RegistrationSchema.js";
import jwt from "jsonwebtoken";

export let Logauth = async (req, res, next) => {
  console.log("wello");

  let isverify = req.header("Authorization");
  console.log(`chhh${isverify}`);

  let jsonwebtoken = isverify.replace("Bearer", "").trim();

  if (!isverify) {
    res.status(400).json({
      message: "in valied token",
    });
  }

  try {
    let fit = jwt.verify(jsonwebtoken, process.env.Coderz, (error, res) => {
      if (error) {
        return "Token expire";
      }
      return res;
      //     console.log("res");

      //   console.log(res);
      //   console.log("autherror");

      //   console.log(error);
    });
    console.log("fit");

    console.log(fit);

    // if (fit=="Token expire") {

    //    req.user={   message:"Token expire"}

    // }

    if (fit !== "Token expire") {
      let user1 = await users.findOne({ email: fit.useremail }).select({
        password: 0,
      });
      console.log(user1);
      let w= await users.find()
        console.log(w);
        
      req.user = user1;
      req.user1=req.body
      req.token = jsonwebtoken;
      req.id = fit.userid;
      next();
    }

   if (fit=="Token expire") {
    res.status(401).json({
      message:"Token expire 444"
    })
   }

    // console.log(`user1  ${user1}`);
  } catch (error) {
    console.log("error");
    console.log(error);
    
    
    // console.log("error");
    
    // console.log(error);
    
  }

  // console.log(isverify);
};
