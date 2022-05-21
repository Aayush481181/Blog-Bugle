const express = require("express");
const bodyParser = require("body-parser");
const lodash = require("lodash");
const app = express();
// require("dotenv").config();

const homePageContent =
  "A blog is a discussion or informational website published on the World Wide Web consisting of discrete, often informal diary-style text entries (posts). Posts are typically displayed in reverse chronological order, so that the most recent post appears first, at the top of the web page. Until 2009, blogs were usually the work of a single individual,[citation needed] occasionally of a small group, and often covered a single subject or topic. In the 2010s, multi-author blogs (MABs) emerged, featuring the writing of multiple authors and sometimes professionally edited. MABs from newspapers, other media outlets, universities, think tanks, advocacy groups, and similar institutions account for an increasing quantity of blog traffic. The rise of Twitter and other microblogging systems helps integrate MABs and single-author blogs into the news media. Blog can also be used as a verb, meaning to maintain or add content to a blog.";
const contactPageContent = "Aayush Sharma [+91 99******88]";
const aboutPageContent =
  "Euismod eget orci non, vestibulum placerat velit. Donec accumsan ante id est ornare, eget malesuada orci accumsan. Fusce consectetur lacus a massa feugiat efficitur. Fusce mollis feugiat metus, ut pharetra lacus porttitor id. Nulla ultrices mauris a neque molestie, in tempor dui ornare. Phasellus sed hendrerit lacus. Proin scelerisque lacinia arcu, non viverra purus aliquam id.";

const posts = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home", { page: homePageContent, title: "Home", posts: posts });
});
app.get("/about", (req, res) => {
  res.render("about", { page: aboutPageContent, title: "AboutUs" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { page: contactPageContent, title: "ContactUs" });
});
app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/posts/:param", (req, res) => {
  if (posts.length > 0) {
    posts.forEach((post) => {
      if (lodash.lowerCase(post.title) === lodash.lowerCase(req.params.param)) {
        res.render("post", { title: post.title, body: post.body });
      } else {
        res.render("notFound", { title: "404", body: "Not Found" });
        // console.log("notFound");
      }
    });
  } else {
    res.render("notFound", {
      title: "No Blogs Yet",
      body: "Be the first To Post a Blog!!",
    });
  }
});
app.get("/error", (req, res) => {
  res.render("notFound", {
    title: "This Title Already Exists",
    body: "Please Use Different Title",
  });
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody,
  };
  var flag = true;
  posts.forEach((post) => {
    if (lodash.lowerCase(post.title) === lodash.lowerCase(req.body.postTitle)) {
      res.redirect("/error");
      flag = false;
    }
  });
  if (flag) {
    posts.push(post);
    res.redirect("/");
  }
});
// var PORT = process.env.PORT;
var PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Running at Port ${PORT} ....`);
});
