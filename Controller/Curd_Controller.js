
import Product from "../Model/CurdSchema.js";

export let productGet = async (req, res) => {
  let isverify = req.header("Authorization");
  console.log(`chhh${isverify}`);
  try {
    let a = await Product.find();
    res.status(200).json({
      success: true,
      message: "Product Get Successfull",
      data: a,
    });
  } catch (error) {
    res.status(400).json({ message: "Not Found" });
  }
};

export let productadd = async (req, res) => {
  console.log("requser");

  console.log(req.user);

  try {
if (req.user!=="Token expire") {
      let { name, age } = req.body;
    console.log(name);
    console.log(age);

    console.log(typeof age);

    if (name !== "" && age !== "") {
      let a = new Product({ name, age });
      await a.save();

      res.status(200).json({
        success: true,
        message: "Product Add Successfull",
        data: a,
      });
    } else if (age == "" || name == "") {
      res.status(400).json({
        success: false,
        message: "Please Enter Data",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Product   Not Add Successfull",
        // data: a,
      });
    }
}
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Please enter age number",
      // data: a,
    });
  }
};

export let productDelete = async (req, res) => {
  let isverify = req.header("Authorization");
  console.log(`chhh${isverify}`);
  let id = req.params.id;
  console.log(id);

  try {
    let a = await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product Delete Successfull",
      data: a,
    });
  } catch (error) {}
};

export let ProductUpdate = async (req, res) => {
  let isverify = req.header("Authorization");
  console.log(`chhh${isverify}`);
  let id = req.params.id;
  console.log(id);
  console.log(req.body);

  try {
    let a = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: "Product Update Successfull",
      data: a,
    });
  } catch (error) {}
};
