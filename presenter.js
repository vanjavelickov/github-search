    import {
        User
    } from './user.js';
    export class Presenter {

        constructor() {
            this.initialUsername = 'octocat';
            this.themeSwitch = document.getElementsByClassName('checkbox');
            this.containerDiv = document.getElementById('container');
            this.imgIcon = this.containerDiv.getElementsByClassName('avatar')[0];
            this.titleLeftName = this.containerDiv.getElementsByClassName('name')[0];
            this.login = this.containerDiv.getElementsByClassName('login')[0];
            this.dateStart = this.containerDiv.getElementsByClassName('date-start')[0];
            this.bio = this.containerDiv.getElementsByClassName('bio')[0];
            this.repos = this.containerDiv.getElementsByClassName('repos')[0];
            this.followers = this.containerDiv.getElementsByClassName('followers')[0];
            this.following = this.containerDiv.getElementsByClassName('following')[0];
            this.locationCompany = this.containerDiv.getElementsByClassName('location')[0];
            this.twitter = this.containerDiv.getElementsByClassName('twitter')[0];
            this.website = this.containerDiv.getElementsByClassName('website')[0];
            this.company = this.containerDiv.getElementsByClassName('company')[0];
            this.errorDiv = this.containerDiv.getElementsByClassName('hidden-error')[0];
            this.toggleButton = this.containerDiv.getElementsByClassName('toggle-class')[0];
            this.toggleButton.onchange = () => this.toggleTheme();
            this.submitButton = this.containerDiv.getElementsByClassName('form-design')[0];
            this.submitButton.onsubmit = (event) => this.getUserDetails(event);
            this.fetchAllData(this.initialUsername);
            this.checkTheme();
        }

        getUserDetails(event) {
            event.preventDefault();
            let username = document.getElementById('username').value;
            this.fetchAllData(username);
        }

        fetchAllData(username) {
            fetch(`https://api.github.com/users/${username}`)
                .then(response => {
                    if (response.status !== 200) {
                        this.errorDiv.innerHTML = 'No results'
                        return;
                    }
                    response.json().then(response => {
                        this.errorDiv.innerHTML = ''
                        this.drawUser(response);
                    });
                })
                .catch(err => {
                    console.log('Error:', err);
                });

        }


        drawUser(response) {
            this.user = new User(response);
            this.titleLeftName.innerHTML = this.user.Name;
            this.login.innerHTML = this.user.Login;
            this.dateStart.innerHTML = this.user.CreatedAt;
            this.bio.innerHTML = this.user.Bio;
            this.imgIcon.src = this.user.AvatarUrl;
            this.repos.innerHTML = this.user.Repos;
            this.followers.innerHTML = this.user.Followers;
            this.following.innerHTML = this.user.Following;
            this.locationCompany.innerHTML = this.user.Location;
            if (this.user.TwitterHref === '') {
                this.twitter.removeAttribute("href");
            } else {
                this.twitter.href = this.user.TwitterAccount;
            }
            this.twitter.innerHTML = this.user.TwitterAccount;

            if (this.user.BlogHref === '') {
                this.website.removeAttribute("href");
            } else {
                this.website.href = this.user.Blog;
            }
            this.website.innerHTML = this.user.Blog;
            if (this.user.CompanyHref === '') {
                this.company.removeAttribute("href");
            } else {
                this.company.href = this.user.Company;
            }
            this.company.innerHTML = this.user.Company;
        }

        toggleTheme() {
            if (localStorage.getItem('theme') === 'theme-dark') {
                this.setTheme('theme-light');
                this.drawIconToggle('dark', 'assets/icon-moon.svg');
            } else {
                this.setTheme('theme-dark');
                this.drawIconToggle('light', 'assets/icon-sun.svg');
            }
        }

        setTheme(themeName) {
            localStorage.setItem('theme', themeName);
            document.documentElement.className = themeName;
        }

        checkTheme() {
            if (localStorage.getItem('theme') === 'theme-dark') {
                this.setTheme('theme-dark');
                document.getElementById('toggle-input').checked = false;
                this.drawIconToggle('light', 'assets/icon-sun.svg');
            } else {
                this.setTheme('theme-light');
                document.getElementById('toggle-input').checked = true;
                this.drawIconToggle('dark', 'assets/icon-moon.svg')
            }
        };

        drawIconToggle(name, iconUrl) {
            document.getElementById('switch').innerHTML = `${name} `;
            let img = document.createElement('img');
            img.src = iconUrl;
            document.getElementById('switch').appendChild(img);
        }
    }