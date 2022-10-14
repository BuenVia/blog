const express = require("express");
const router = express.Router();
// const nodeMailer = require("nodemailer");

// const transporter = nodeMailer.createTransport({
//   service: "Hotmail",
//   auth: {
//     user: process.env.EMAIL_ADD,
//     pass: process.env.EMAIL_PW
//   }
// });

const Downloads = require("../models/downloads");
const Webinars = require("../models/webinars");

router.get("/api/ebook", (req, res) => {
  Downloads.find({}, (err, foundResults) => {
    if (!err) {
      res.send(foundResults);
    }
  });
});

router.post("/api/ebook", (req, res) => {
  const newDownload = new Downloads({
    name: req.body.name,
    email: req.body.email
  });
  // const mailOptions = {
  //   from: "matthewclifford@hotmail.co.uk",
  //   to: "mclifford1984@gmail.com",
  //   subject: `${newDownload.name}`,
  //   text: "That was easy!"
  // };
  newDownload.save((err) => {
    if (!err) {
      // transporter.sendMail(mailOptions);
      res.send(`Successully saved:\n${newDownload}`);
    }
  });
});

router.get("/api/webinar", (req, res) => {
  Webinars.find({}, (err, foundResults) => {
    if (!err) {
      res.send(foundResults);
    } else {
      res.send(err);
    }
  });
});

router.post("/api/webinar", (req, res) => {
  const newWebinar = new Webinars({
    title: req.body.title,
    summary: req.body.summary,
    date: req.body.date,
    time: req.body.time,
    attendees: req.body.attendees
  });
  newWebinar.save((err) => {
    if (!err) {
      res.send(`Successfully saved:\n${newWebinar}`);
    }
  });
});

module.exports = router;
