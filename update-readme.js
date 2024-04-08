const fs = require('fs');

          const currentDate = new Date().toLocaleString();
          const readmePath = 'https://github.com/rock12231/Readme-Update/README.md';

          fs.readFile(readmePath, 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }

            const updatedReadme = data.replace(
              /Last updated: (.*)/,
              `Last updated: ${currentDate}`
            );

            fs.writeFile(readmePath, updatedReadme, 'utf8', (err) => {
              if (err) {
                console.error(err);
                return;
              }

              console.log('README.md updated successfully');
            });
          });
