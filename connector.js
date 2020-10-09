const { Octokit } = require('@octokit/rest');

const AUTH_TOKEN = 'd4f93c83f9d6d953e236ad44b9df582468d6f20f';
const REPO_OWNER = 'massiveinfinity';
const REPO = 'temp-api-repo';

const octokit = new Octokit({
  auth: AUTH_TOKEN,
});

const doSomething = async () => {
  const res = await octokit.repos.getContent({
    owner: REPO_OWNER,
    repo: REPO,
    path: 'test.json',
  });
  console.log('##res', res);

  const { status, data } = res;

  if (status === 200) {
    const { content } = data;
    const fileContent = Buffer.from(content, 'base64').toString('utf8');
    console.log('FileContent:', fileContent);

    console.log('Length: ' + JSON.parse(fileContent)[0]);
  }
};

const doAction = async () => {
  const content = [
    {
      id: '123',
      name: 'Hoolah',
      modifiedAt: 123123123,
    },
  ];

  const contentBuffer = Buffer.from(JSON.stringify(content)).toString('base64');

  const res = await octokit.repos.createOrUpdateFileContents({
    owner: REPO_OWNER,
    repo: REPO,
    path: 'test.json',
    message: 'This is my commit',
    content: contentBuffer,
  });
  console.log('##res', res);
};

function main() {
  console.log('**** main *****');
  try {
    doSomething();
    // doAction();
  } catch (err) {
    console.log('error', err);
    console.log('message:' + err.message);
  }
}

main();
