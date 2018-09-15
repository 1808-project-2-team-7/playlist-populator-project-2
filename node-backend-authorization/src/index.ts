import express from 'express';
import request from 'request';
import cors from 'cors';

const app=express();

const port=8888;

const client_id=process.env.CLIENT_ID;
const client_secret=process.env.CLIENT_SECRET;

// only allow all for development
app.use(cors());

app.get('/login', (req: any, resp: any) => {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  }
  request.post(authOptions, (error: any, response: any, body: any) => {
    if (!error && response.statusCode === 200) {
      const token = body.access_token;
      resp.json(token);
    }
  }) 
});

app.listen(port)







