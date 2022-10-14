const express = require("express");
const router = express.Router();

const Downloads = require("../models/downloads");
const Webinars = require("../models/webinars");

// Login and homepages
router.get("/admin", (req, res) => {
  res.render("admin/index");
});

router.get("/home", (req, res) => {
  res.render("admin/admin-console");
});

router.post("/admin", (req, res) => {
  if (req.body.userName === "James" && req.body.password === "EA51VDA") {
    res.render("admin/admin-console");
  } else {
    res.send("Failure");
  }
});

// Create and edit a webinar

router.get("/admin/webinar", (req, res) => {
  Webinars.find({}, (err, foundResults) => {
    if (!err) {
      res.render("admin/webinar", { webinars: foundResults });
    }
  });
});

router.post("/admin/webinar", (req, res) => {
  const newWebinar = new Webinars({
    title: req.body.title,
    summary: req.body.summary,
    date: req.body.date,
    time: req.body.time,
    attendees: req.body.attendees
  });

  newWebinar.save((err) => {
    if (!err) {
      res.redirect("/admin/webinar");
    }
  });
});

router.get("/admin/webinar/edit/:id", (req, res) => {
  const webId = req.params.id;
  Webinars.findOne({ _id: webId }, (err, foundResult) => {
    if (!err) {
      res.render("admin/webinar-edit", { webinar: foundResult });
    }
  });
});

router.post("/admin/webinar/edit/:id", (req, res) => {
  const webId = req.params.id;
  Webinars.updateOne({ _id: webId }, { $set: req.body }, (err) => {
    if (!err) {
      res.redirect("/admin/webinar");
    }
  });
});

// Show who has downloaded eBook
router.get("/admin/ebook", (req, res) => {
  Downloads.find({}, (err, foundResults) => {
    if (!err) {
      res.render("admin/downloads", { downloads: foundResults });
    }
  });
});

module.exports = router;
