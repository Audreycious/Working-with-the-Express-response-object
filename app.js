const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore');

const app = express();

app.use(morgan('dev'));

app.get('/apps', (req, res) => {
    const ps = playstore;
    let genreFilter = [];
    const { sort = "", genres = [] } = req.query;
    console.log(genres.length)
    if(sort) {
        if(!['App', 'Rating'].includes(sort)) {
          return res
            .status(400)
            .send('Sort must be one of App or Rating');
        }
    }
    if ((typeof genres) === "string") {
        genres = [genres];
    }
    if (genres) {
        let genreOptions = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];
        if (genres.length != 1) {
            for (let i = 0, len = genres.length; i < len; i++) {
                console.log(genreOptions, genres)
                if (!genreOptions.includes(genres[i])) {
                    return res.status(400).send("Genres must be one or more of: Action, Puzzle, Strategy, Casual, Arcade, or Card.")
                }
                for (let i = 0, len = ps.length; i < len; i++) {
                    console.log(ps[i].Genres.toLowerCase())
                    // console.log(genres[i])
                    if (genres.includes(ps[i].Genres.toLowerCase())) {
                        genreFilter.push(ps[i])
                    }
                }
            }
        }
        else {
            for (let i = 0, len = ps.length; i < len; i++) {
                // console.log(ps[i])
                console.log(ps[i].Genres.toLowerCase())
                console.log(genres)
                if (ps[i].Genres.toLowerCase() === genres) {
                    genreFilter.push(ps[i])
                    console.log(genreFilter)
                }
            }
        }
    }
    if(sort) {
        genreFilter
          .sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        }); 
    }  

    res
        .send(genreFilter);
  });

app.listen(8000, () => {
console.log('Server started on PORT 8000');
    });