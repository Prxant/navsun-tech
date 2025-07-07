const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const topicsPath = path.join(__dirname, '../data/topics.json');
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));


router.get('/', (req, res) => {
  res.render('home', { topics });
});


router.get('/topic/:id', (req, res) => {
  const topic = topics.find(t => t.id === req.params.id);
  if (topic) {
    res.render('topic', { topic });
  } else {
    res.status(404).render('404');
  }
});
router.get('/about', (req, res) => {
  res.render('about');
});


module.exports = router;

