export class ApiGit {
    constructor(options) {
        this.url = options['url'];
        this.headers = options['headers'];
    }

    getCommits() {
        return fetch(`${this.url}`, {
            method: 'GET',
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {
                return res.json()
            }
    
                return Promise.reject(`Ошибка: ${res.status}`);
            })

            .catch((err) => {
                console.log(err);
            })
    }
}