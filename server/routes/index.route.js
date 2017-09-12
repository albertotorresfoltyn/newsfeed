import express from 'express';
import generic from '../helpers/db.js';

const router = express.Router(); // eslint-disable-line new-cap
const ObjectID = require('mongodb').ObjectID;

/** GET /health-check - Check service health */
router.get('/get-articles', async (req, res) => {
  const storedStory = new generic('megaDB', 'stories');
  let r2 = await storedStory.read({deleted:false})
  let allResults = [];
  for (let doc = await r2.next(); doc != null; doc = await r2.next()) {
    allResults.push(doc);
  }
  res.json(allResults);
});

router.get('/delete-atricle/:id', async (req, res) => {
  let id = req.params.id;
  const storedStory = new generic('megaDB', 'stories');
  try {
    let r2 = await storedStory.update(ObjectID(`0000${id}`), {deleted:true})
    res.json('Ok');
  } catch (e){
    res.json('Error');
  }
});

router.get('/get-page', async (req, res) => {
  const storedStory = new generic('megaDB', 'stories');
  let r2 = await storedStory.read({deleted:false})
  let allResults = [];
  for (let doc = await r2.next(); doc != null; doc = await r2.next()) {
    allResults.push(doc);
  }
  res.render('index',{pagedata: {rows: allResults}} );
});

export default router;
