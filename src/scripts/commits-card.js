export class CommitCard {
    constructor(date, avatar, name, email, text) {
        this.commitElement = this.createCommitCard(date, avatar, name, email, text);
    }

    createCommitCard(commitDate, authorAvatar, authorName, authorEmail, commitText) {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');

        const commitCard = document.createElement('div');
        commitCard.classList.add('commits__card');

        const cardDate = document.createElement('p');
        cardDate.classList.add('commits__date');
        cardDate.textContent = commitDate;

        const commitPersonal = document.createElement('div');
        commitPersonal.classList.add('commits__personal');

        const commitAvatar = document.createElement('div');
        commitAvatar.classList.add('commits__avatar');
        commitAvatar.style.backgroundImage = `url(${authorAvatar})`;

        const commitNameMail = document.createElement('div');
        commitNameMail.classList.add('commits__name-mail');

        const commitName = document.createElement('p');
        commitName.classList.add('commits__name');
        commitName.textContent = authorName;

        const commitMail = document.createElement('p');
        commitMail.classList.add('commits__mail');
        commitMail.textContent = authorEmail;

        const commitDescription = document.createElement('p');
        commitDescription.classList.add('commits__text');
        commitDescription.textContent = commitText;

        commitNameMail.appendChild(commitName);
        commitNameMail.appendChild(commitMail);

        commitPersonal.appendChild(commitAvatar);
        commitPersonal.appendChild(commitNameMail);

        commitCard.appendChild(cardDate);
        commitCard.appendChild(commitPersonal);
        commitCard.appendChild(commitDescription);

        swiperSlide.appendChild(commitCard);

        return swiperSlide;
    }
}