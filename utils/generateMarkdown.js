// helper function to capitalize first letter of each word
capFirstLetters = string => {
    return string.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};

// creates license badge if license is chosen
addBadge = license => {
    if (license) {
        return `![${license} License](https://img.shields.io/badge/license-${license.split(' ').join('%20')}-brightgreen)
`
    } else {
        return '';
    }
}

// creates description section
createDescription = (title, description, link) => {
    if (link) {
        return `${description}
        
View the deployed page at [${capFirstLetters(title)}](${link}).`
    } else {
        return `${description}`
    }
};

// creates table of contents
createTableOfContents = contentsArr => {

    let contentsList = '';
    contentsArr.forEach(item => {
        contentsList += `* [${item}](#${item.toLowerCase().split(' ').join('-')})
`
    })
    return contentsList;
};

// creates screenshot section
createScreenshots = screenshotItem => {
    
    let allScreenshots = '';
    if (screenshotItem) {
        screenshotItem.forEach(shot => {
            allScreenshots += `![${shot.screenshotAlt}](${shot.screenshotLink})
${shot.screenshotDesc}
`
        })

        return `
    
### Screenshots
${allScreenshots}`;
    } else {
        return '';
    }
};

// creates license section
createLicense = license => {
    if (license) {
        return `This application is licensed under the ${license} license.`
    } else {
        return '';
    }
};

// creates credits section
createCredits = creditItem => {

    let allCredits = '';
    if (creditItem) {
        creditItem.forEach(credit => {
            allCredits += `* [${credit.creditName}](${credit.creditLink})
`
        })
        
        return `${allCredits}`
    } else {
        return '';
    }
};

// function to generate markdown for README
function generateMarkdown(data) {

    let readmeContents = '';
    const sectionArr = [
        {
            h2: 'Description',
            content: createDescription(data.title, data.description, data.link)
        },
        {
            h2: 'Installation',
            content: data.installation
        },
        {
            h2: 'Usage',
            content: `${data.usage} ${createScreenshots(data.screenshots)}`
        },
        {
            h2: 'License',
            content: createLicense(data.license)
        },
        {   h2: 'Contributing',
            content: data.contributing
        },
        {
            h2: 'Tests',
            content: data.tests
        },
        {
            h2: 'Questions',
            content: `If you have any questions about the repo, please open an issue or contact me via ${data.questions}. You can find more of my work on my [GitHub](https://github.com/${data.github}/).`
        },
        {
            h2: 'Credits',
            content: createCredits(data.credits)
        }
    ]

    sectionArr.forEach(sectionItem => {
        if (sectionItem.content) {
            readmeContents += `## ${sectionItem.h2}
${sectionItem.content}
    
`
        }
    })

    return `# ${capFirstLetters(data.title)}
${addBadge(data.license)}
${readmeContents}`;
};

module.exports = generateMarkdown;