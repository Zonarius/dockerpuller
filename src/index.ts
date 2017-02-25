import * as http from 'http';
import * as Compose from 'docker-compose-js';
import * as Express from 'express';
import * as Config from './config';
import * as bodyParser from 'body-parser';

const app = Express();
app.use(bodyParser.json());

app.post('/postreceive', async (req, res) => {
  try {
    let dockerPost: DockerPost = req.body;
    res.send("OK");
    let repoName = dockerPost.repository.repo_name;
    console.log(`got message from docker for ${repoName}`)
    let config = await Config.readConfig();
    let dockerComposeFile = config.hooks[repoName];

    if (!dockerComposeFile) {
      console.error(`Could not find docker-compose file for repository ${repoName}!`)
      return;
    }
    let compose = Compose(dockerComposeFile);

    await compose.pull();
    compose.up();
  } catch (err) {
    console.error(err);
  }
})

async function main() {
  let config = await Config.readConfig();
  let port = config.port || 8080
  app.listen(port, () => {
    console.log(`Listening on ${port}`)
  });
}

main().catch(console.error);