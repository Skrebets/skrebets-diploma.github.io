import "./pages/about.css";

import {ApiGit} from './scripts/api-git.js';
import {CommitCardList} from './scripts/commits-cardList.js';

const swiperContainer = document.querySelector('.swiper-wrapper');

const apiKey = 'e1fbdb21da4ed65557b61bdbda55de9b013732e9';

const apiGit = new ApiGit({
    url: 'https://api.github.com/repos/Skrebets/skrebets-diploma.github.io/commits',
    headers: {
      authorization: `${apiKey}`,
      'Content-Type': 'application/json'
    }
})

apiGit.getCommits()
  .then((result) => {
    return new CommitCardList(swiperContainer, result);
})

  .catch((error) => {
  console.log(error);
})
