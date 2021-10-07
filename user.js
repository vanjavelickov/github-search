export class User {
    constructor(data) {
        this.login = data.login;
        this.name = data.name;
        this.createdAt = data.created_at;
        this.avatarUrl = data.avatar_url;
        this.bio = data.bio;
        this.repos = data.public_repos;
        this.followers = data.followers;
        this.following = data.following;
        this.location = data.location;
        this.twitterAccount = data.twitter_username;
        this.blog = data.blog;
        this.company = data.company;
    }

    get Login() {
        return `@${this.login}`;
    }

    get Name() {
        if (this.name)
            return this.name;
        else
            return this.login;
    }

    get CreatedAt() {
        this.createdAtDate = new Date(this.createdAt).toDateString().substr(4, 15)
        return `Joined ${this.createdAtDate}`;
    }

    get Bio() {
        if (this.bio)
            return this.bio;
        else
            return 'This profile has no bio';
    }

    get AvatarUrl() {
        return this.avatarUrl;
    }

    get Repos() {
        return this.repos;
    }

    get Followers() {
        return this.followers;
    }

    get Following() {
        return this.following;
    }

    get Location() {
        if (this.location)
            return this.location;
        else
            return 'Not Available';
    }

    get TwitterAccount() {
        if (this.twitterAccount)
            return this.twitterAccount;
        else
            return 'Not Available';
    }

    get TwitterHref() {
        if (this.twitterAccount) {
            return this.twitterAccount;
        } else {
            return '';
        }
    }

    get Blog() {
        if (this.blog)
            return this.blog;
        else
            return 'Not Available';
    }

    get BlogHref() {
        if (this.blog) {
            return this.blog;
        } else {
            return '';
        }
    }

    get Company() {
        if (this.company)
            return this.company;
        else
            return 'Not Available';
    }

    get CompanyHref() {
        if (this.company) {
            return this.company;
        } else {
            return '';
        }
    }

}