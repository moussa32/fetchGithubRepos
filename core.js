// Main Variables

let Username = document.querySelector("#username");
let submitButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

submitButton.onclick = () => {
  getRepos();
};

//Get Repos Data Function
function getRepos() {
  if (Username.value == "") {

    reposData.innerHTML = "<span>Please write Github Username</span>";

  }else {

    fetch(`http://api.github.com/users/${Username.value}/repos`)
      .then((response) => response.json())
      .then((repositories) => {

        console.log(repositories);

        reposData.innerHTML = "";

        if(repositories && repositories.length > 0){
          
          repositories.forEach((repo) => {
            //Create The Main Div Element
            let repoItem = crElement("div");
  
            //Set Class name to repoItem
            repoItem.classList.add("repo-box");
  
            //Set Repo Name
            repoName(repo, repoItem);
            
            //Create container to repo options
            let optionButtons = crElement("div");
            optionButtons.setAttribute("class","option-buttons");
            appendElement(repoItem, optionButtons);
  
            //Set Repo link to optionButtons div
            repoURL(repo, "Code", optionButtons);
            
            //Set Repo Stars
            repoStars(repo, optionButtons);
  
            //Set Repo Forks
            repoForks(repo, optionButtons);
  
            appendElement(reposData, repoItem);
  
          });
        }else{
          reposData.innerHTML = "Erorr";
        }
      });
  }
}

function repoName(repo, element){
  return setInner(element, `<span class="repo-name">${repo.name}</span>`);
}

function repoURL(repo, linkText, parintElement){
  //Create Repo link
  let repoLink = crElement("a");

  //Set Link text
  setText(repoLink, linkText);

  //Set Link href
  repoLink.setAttribute("href",`https://www.github.com/${Username.value}/${repo.name}`);
  repoLink.setAttribute("target", "blank");
  repoLink.setAttribute("class", "repo-link");

  return appendElement(parintElement, repoLink);
}

function repoStars(repo, parintElement){
  //Create start item
  let starElement = crElement("span");

  starElement.setAttribute("class", "repo-stars")
  setText(starElement, `Stars: ${repo.stargazers_count}`);

  return appendElement(parintElement, starElement);
}

function repoForks(repo, parintElement){
  //Create start item
  let starElement = crElement("span");

  starElement.setAttribute("class", "repo-forks")
  setText(starElement, `Forks: ${repo.forks_count}`);

  return appendElement(parintElement, starElement);
}

function crElement(element){
  return document.createElement(element);
}

function appendElement(parintElement, childElement){
  return parintElement.appendChild(childElement);
}

function setText(element,text){
  return element.textContent = text;
}

function setInner(element, text){
  return element.innerHTML = text;
}
