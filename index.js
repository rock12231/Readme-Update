const axios = require('axios');
const fs = require('fs');

// Replace 'YOUR_GITHUB_USERNAME' and 'YOUR_GITHUB_TOKEN' with your GitHub username and a personal access token
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
    } catch (error) {
        console.error('Failed to fetch repositories:', error.message);
    }
}

fetchRepos();
