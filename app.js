const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');


const topics = JSON.parse(fs.readFileSync('./data/topics.json', 'utf-8'));


app.get('/', (req, res) => {
  res.render('home', { title: "How Tech Works", topics: topics });
});

app.get('/admin/add', (req, res) => {
  res.render('add', { title: "Add Topic" });
});


app.post('/admin/add', (req, res) => {
  const { id, title, image, summary, details } = req.body;

  
  const topics = JSON.parse(fs.readFileSync('./data/topics.json', 'utf-8'));

  if (topics.some(t => t.id === id)) {
    return res.send("❌ Topic with this ID already exists.");
  }

  const newTopic = { id, title, image, summary, details };
  topics.push(newTopic);

  fs.writeFileSync('./data/topics.json', JSON.stringify(topics, null, 2));

  res.redirect('/');
});

app.get('/topic/:id', (req, res) => {
  const topicId = req.params.id;
  const topic = topics.find(t => t.id === topicId);
  
  if (topic) {
    res.render('topic', { title: topic.title, topic: topic });
  } else {
    res.status(404).send('Topic not found');
  }
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About - NavSun Tech' });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


app.use((req, res) => {
  res.status(404).render('404');
});
