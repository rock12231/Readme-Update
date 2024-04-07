const axios = require('axios');
const fs = require('fs');

// Replace 'YOUR_GITHUB_TOKEN' with your personal access token
const token = 'YOUR_GITHUB_TOKEN';

async function fetchRepos() {
    try {
        const response = await axios.get(`https://api.github.com/users/rock12231/repos`, {
            // headers: {
            //     Authorization: `token ${token}`,
            // },
        });

        const publicRepos = response.data.filter(repo => !repo.private);
        const privateRepos = response.data.filter(repo => repo.private);

        const data = JSON.stringify({ publicRepos, privateRepos }, null, 2);
        fs.writeFileSync('data.json', data);
        console.log('Repositories fetched and saved to data.json');

        // Pull changes from the remote repository
        const { execSync } = require('child_process');
        execSync('git pull origin master');

        // Commit and push changes
        execSync('git add .');
        execSync('git commit -m "chore: update repositories"');
        execSync('git push');

        console.log('Changes committed and pushed to the remote repository');
    } catch (error) {
        console.error('Failed to fetch repositories:', error.message);
    }
}

fetchRepos();
