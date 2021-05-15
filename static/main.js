const ORG_NAME = "Ext-Creators";

async function loadIndex() {
    return (await fetch("./index.json")).json();
}

async function getRepoInfo(repository) {
    return (await fetch(`https://api.github.com/repos/${ORG_NAME}/${repository}`)).json();
}


const br = document.createElement("br");

const separator = document.createElement("span");
separator.innerText = " - "


async function displayIndex() {
    const index = await loadIndex();
    
    const repositoryList = document.getElementById('repositories');

    for (const [repository, configuration] of Object.entries(index)) {
        const repositoryInfo = await getRepoInfo(repository);
        console.log(repositoryInfo);

        const repositoryElement = document.createElement("div");
        repositoryElement.id = repository;

        const repositoryName = document.createElement("h2");
        repositoryName.innerText = repositoryInfo.name;

        const repositoryDesc = document.createElement("span");
        repositoryDesc.innerText = repositoryInfo.description;

        const latestLink = document.createElement('a');
        latestLink.innerText = "latest";
        latestLink.href = `${repository}/${configuration.latest}`;

        const stableLink = document.createElement('a');
        stableLink.innerText = "stable";
        stableLink.href = `${repository}/${configuration.stable}`;

        const tagList = document.createElement("select");
        tagList.setAttribute("onchange", `window.location.href=\`${repository}/\${this.value}\``);
        tagList.value = "";

        const tagUnselected = document.createElement("option");
        tagUnselected.disabled = true;
        tagUnselected.selected = true;
        tagUnselected.innerText = "-- Select a tag --";

        tagList.appendChild(tagUnselected);

        for (const tag of configuration.tags) {
            const tagEntry = document.createElement("option");
            tagEntry.innerText = tag;
            tagEntry.value = tag;
            tagList.appendChild(tagEntry);
        }

        // Build element
        // TODO: Styling
        repositoryElement.appendChild(repositoryName);
        repositoryElement.appendChild(repositoryDesc);
        repositoryElement.appendChild(br.cloneNode(true));
        repositoryElement.appendChild(latestLink);
        repositoryElement.appendChild(separator.cloneNode(true));
        repositoryElement.appendChild(stableLink);
        repositoryElement.appendChild(separator.cloneNode(true));
        repositoryElement.appendChild(tagList);

        repositoryList.appendChild(repositoryElement);
    }
}

displayIndex();