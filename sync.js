const { Octokit } = require('@octokit/rest');

const AUTH_TOKEN = 'd4f93c83f9d6d953e236ad44b9df582468d6f20f';
const REPO_OWNER = 'massiveinfinity';
const REPO = 'temp-api-repo';

const octokit = new Octokit({
  auth: AUTH_TOKEN,
});

const getFile = async (path) => {
  try {
    const res = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO,
      path,
    });

    const { status, data } = res;

    if (status === 200) {
      return data;
    }

    return null;
  } catch (err) {
    console.log('err', err);
    return null;
  }
};

const createUpdateFile = ({ path, content, sha, message }) => {
  const modContentType =
    typeof content === 'object' ? JSON.stringify(content) : content;

  const contentBuffer = Buffer.from(modContentType).toString('base64');

  return octokit.repos.createOrUpdateFileContents({
    owner: REPO_OWNER,
    repo: REPO,
    path,
    content: contentBuffer,
    message: message || 'This is an awesome commit',
    sha,
  });
};

const updateDictionary = async ({ workspaceId, workspaceName, modifiedAt }) => {
  const dictionaryFile = await getFile('dictionary.json');

  let fileSHA = null;
  const newDictionary = [];

  // If file is there, update data
  if (dictionaryFile) {
    ({ sha: fileSHA } = dictionaryFile);
    const { content } = dictionaryFile;
    const fileContent = Buffer.from(content, 'base64').toString('utf8');

    const dictionaryFromRepo = JSON.parse(fileContent);

    const workspaceInRepo = dictionaryFromRepo.find(
      (el) => el.workspaceId === workspaceId
    );
    if (workspaceInRepo) {
      const otherWorkspaceData = dictionaryFromRepo.filter(
        (el) => el.workspaceId !== workspaceId
      );

      newDictionary.push(...otherWorkspaceData);

      const modifiedWorkspaceData = { ...workspaceInRepo };
      modifiedWorkspaceData.modifiedAt = modifiedAt;

      newDictionary.push(modifiedWorkspaceData);
    } else {
      newDictionary.push({
        workspaceId,
        workspaceName,
        modifiedAt,
      });
    }
  } else {
    newDictionary.push({
      workspaceId,
      workspaceName,
      modifiedAt,
    });
  }

  console.log('##newDictionary', newDictionary);
  await createUpdateFile({
    path: 'dictionary.json',
    content: newDictionary,
    sha: fileSHA,
  });
};

const updateWorkspace = async ({ workspaceId }, workspaceData) => {
  const filename = `${workspaceId}.json`;
  const workspaceFile = await getFile(filename);

  const fileSHA = workspaceFile ? workspaceFile.sha : null;

  await createUpdateFile({
    path: filename,
    content: workspaceData,
    sha: fileSHA,
  });
};

module.exports = {
  updateDictionary,
  updateWorkspace,
};
