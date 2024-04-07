const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function fetchRepositories() {
  try {
    const { data } = await octokit.repos.listForAuthenticatedUser({
      per_page: 100
    });

    return data.map(repo => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description
    }));
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

async function main() {
  const repositories = await fetchRepositories();
  console.log('Fetched repositories:', repositories);
}

main();
