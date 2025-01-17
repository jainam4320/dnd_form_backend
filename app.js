const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbConnect = require("./common/dbConnect");
const User = require("./model/user");
const Forms = require("./model/forms");
const auth = require("./module/auth");

dbConnect();

// Adding CORS Headers (For Cross Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! Server is Running!" });
  next();
});

// [Post] Register Methos
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Signed Up Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error Sigining Up the user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// [Post]Login Methos
app.post("/login", (request, response) => {
  User.findOne({ email: request.body.email })
    .then((user) => {
      bcrypt.compare(request.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Credential does not match",
              error,
            });
          }

          // Creating a JWT Token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Credential does not match",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Email missing from the system, Please Register`",
        e,
      });
    });
});

// authentication endpoint
app.get("/api/forms/list", auth, (request, response) => {
  Forms.find().then((result) => {
    response.status(200).send({
      message: "Form List",
      result,
    });
  });
});

// authentication endpoint
app.get("/api/forms/view/:formId", auth, (request, response) => {
  Forms.findById(request.params.formId).then((result) => {
    response.status(200).send(result);
  });
});

// Save form data
app.post("/api/forms/save", auth, (request, response) => {
  const form = new Forms({
    form_name: request.body.form_name,
    form_data: request.body.form_data,
  });
  form.save()
    .then((result) => {
      response.status(201).send({
        message: "Form Saved Successfully",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Error Saving Form",
        error,
      });
    });
});

module.exports = app;
