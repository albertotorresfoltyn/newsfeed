
import request from 'request';
// config should be imported before importing any other file
import config from './config/config.js';
import app from './config/express.js';
import generic from './helpers/db.js';
const ObjectID = require('mongodb').ObjectID;
const debug = require('debug')('express-mongoose-es6-rest-api:index');

const storedStory = new generic('megaDB', 'stories');

setInterval(() => {
  request('http://hn.algolia.com/api/v1/search_by_date?query=nodejs', (error, response, body) => {
    const jsonData = JSON.parse(body).hits;
    jsonData.map((story) => {
      if ((story.title) || (story.story_title)){
        storedStory.create({ ...{_id: ObjectID(`0000${story.objectID}`), deleted: false},...story});
      }
      return null;
    });
  });
}, config.refreshTime);

app.listen(config.port, () => {
  console.info(`server started on port ${config.port}`); // eslint-disable-line no-console
});


export default app;
