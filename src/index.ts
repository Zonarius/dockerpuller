import * as http from 'http';
import * as Compose from 'docker-compose-js';
import * as Express from 'express';
import * as Config from './config';

const app = Express();

app.post('/postreceive', async (req, res) => {
  let dockerPost: DockerPost = JSON.parse(req.body);
  res.send("OK");
  let config = await Config.readConfig();
  let dockerComposeFile = config.hooks[dockerPost.repository.repo_url];
  let compose = Compose(dockerComposeFile);

  await compose.pull();
  compose.up();
})