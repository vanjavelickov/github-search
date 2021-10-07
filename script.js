const initialUsername = 'octocat';
let containerDiv;
let imgIcon;
let titleLeftName;
let login;
let dateStart;
let bio;
let repos;
let followers;
let following;
let locationCompany;
let twitter;
let website;
let company;
let errorDiv;
let themeSwitch;
window.onload = initialize();

function initialize() {
    themeSwitch = document.getElementsByClassName('checkbox');
    containerDiv = document.getElementById('container');
    imgIcon = containerDiv.getElementsByClassName('avatar')[0];
    titleLeftName = containerDiv.getElementsByClassName('name')[0];
    login = containerDiv.getElementsByClassName('login')[0];
    dateStart = containerDiv.getElementsByClassName('date-start')[0];
    bio = containerDiv.getElementsByClassName('bio')[0];
    repos = containerDiv.getElementsByClassName('repos')[0];
    followers = containerDiv.getElementsByClassName('followers')[0];
    following = containerDiv.getElementsByClassName('following')[0];
    locationCompany = containerDiv.getElementsByClassName('location')[0];
    twitter = containerDiv.getElementsByClassName('twitter')[0];
    website = containerDiv.getElementsByClassName('website')[0];
    company = containerDiv.getElementsByClassName('company')[0];
    errorDiv = containerDiv.getElementsByClassName('hidden-error')[0];
    fetchAllData(initialUsername);
}


function fetchAllData(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then(
            function (response) {
                if (response.status !== 200) {
                    errorDiv.innerHTML = 'No results'
                    return;
                }
                response.json().then(function (response) {
                    errorDiv.innerHTML = ''
                    drawUser(response);
                });
            }
        )
        .catch(function (err) {
            console.log('Error:', err);
        });

}


function getUserDetails() {
    event.preventDefault();
    let username = document.getElementById('username').value;
    fetchAllData(username);

}

function drawUser(response) {
    if (response.name === null) {
        titleLeftName.innerHTML = response.login;
    } else {
        titleLeftName.innerHTML = response.name;
    }
    login.innerHTML = '@' + response.login;
    let dateFromResponse = new Date(response.created_at).toDateString().substr(4, 15);
    dateStart.innerHTML = 'Joined ' + dateFromResponse;

    if (response.bio === null) {
        bio.innerHTML = 'This profile has no bio';
    } else {
        bio.innerHTML = response.bio;
    }
    imgIcon.src = response.avatar_url;
    repos.innerHTML = response.public_repos;
    followers.innerHTML = response.followers;
    following.innerHTML = response.following;
    if (response.location === null) {
        locationCompany.innerHTML = 'Not Available';
    } else {
        locationCompany.innerHTML = response.location;
    }
    if (response.twitter_username === null) {
        twitter.innerHTML = 'Not Available';
    } else {
        twitter.innerHTML = response.twitter_username;
    }
    if (response.blog === null || response.blog === '') {
        website.innerHTML = 'Not Available';
    } else {
        website.innerHTML = response.blog;
    }
    if (response.company === null) {
        company.innerHTML = 'Not Available';
    } else {
        company.innerHTML = response.company;
    }
}


