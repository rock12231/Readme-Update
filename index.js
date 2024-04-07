const axios = require('axios');
const fs = require('fs');
const { execSync } = require('child_process');

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

        // dete data.json file if exists
        if (fs.existsSync('data.json')) {
            fs.unlinkSync('data.json');
        }

        const data = JSON.stringify({ publicRepos, privateRepos }, null, 2);
        fs.writeFileSync('data.json', data);
        console.log('Repositories fetched and saved to data.json');

        // Pull changes from the remote repository
        execSync('git pull origin master');

        // Commit changes to data.json
        // git add data.json --force
        execSync('git add data.json --force');
        execSync('git commit -m "chore: update repositories in data.json"');

        // Update README file with current date and time
        const now = new Date();
        const readmeContent = `Update DateTime: ${now.toLocaleString()}`;
        fs.appendFileSync('README.md', readmeContent);

        // Commit changes to README.md
        execSync('git add README.md');
        execSync('git commit -m "chore: update README.md with current date and time"');

        // Push changes to the remote repository
        execSync('git push');

        console.log('Changes committed and pushed to the remote repository');
    } catch (error) {
        console.error('Failed to fetch repositories:', error.message);
    }
}

fetchRepos();
