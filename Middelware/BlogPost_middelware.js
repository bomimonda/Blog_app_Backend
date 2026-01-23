import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import Post from "../Model/Blogpost.js";

export const check = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { Titel, Information, userid } = req.body;

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "Home" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    const post = await Post.create({
      Image: result.secure_url,
      Titel,
      Information,
      userid,
      Day: new Date(),
    });

    res.status(200).json({
      status: 200,
      message: "Post successful",
      data: post,
    });

  } catch (error) {
    console.error(error);
    console.log(cloudinary);
    
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message,
    });
  }
};















// import { v2 as cloudinary } from "cloudinary";
// import streamifier from "streamifier";
// import Post from "../Model/Blogpost.js";
// // import cloudinary from "../config/cloudinary.js";
// // Cloudinary config
// let p=cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


// // Upload Blog Post
// export const check = async (req, res) => {
//   console.log(process.env.api_key);
//   console.log("ppppppppppppppppp");


  
//   try {
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     const { Titel, Information, userid } = req.body;
//     console.log(cloudinary);
//   console.log("ppppppppppppppppp");

//     // Upload directly from memory buffer
//     const result = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: "Home" },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       );
//       streamifier.createReadStream(req.file.buffer).pipe(stream);
//     });

//     // Save to DB
//     const post = await Post.create({
//       Image: result.secure_url,
//       Titel,
//       Information,
//       userid,
//       Day: new Date(),
//     });

//     res.status(200).json({ status: 200, message: "Post successful", data: post });
//   } catch (error) {
//     console.log(error);
//   console.log({
//   cloud: process.env.CLOUDINARY_CLOUD_NAME,
//   key: process.env.CLOUDINARY_API_KEY,
//   secret: process.env.CLOUDINARY_API_SECRET,
// });

//   console.log("ppppppppppppppppp");
//     res.status(500).json({ status: 500, message: "Server error", error: error.message });
//   }
// };

// Other controllers like setimage, AllBlog, UserBlog can use same memoryStorage + Cloudinary logic
