export class Card {
    constructor(pic, date, title, text, portal, portalName) {
        this.cardElement = this.createCard(pic, date, title, text, portal, portalName);
    }

    createCard(picLink, dateDescription, titleName, textDescription, portalLink, portalText) {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('results__card');

        const cardPic = document.createElement('div');
        cardPic.classList.add('results__card-pic');
        cardPic.style.backgroundImage = `url(${picLink})`;

        const cardDescription = document.createElement('div');
        cardDescription.classList.add('results__card-description');

        const cardDate = document.createElement('p');
        cardDate.classList.add('results__card-date');
        cardDate.textContent = dateDescription;

        const cardTitle = document.createElement('h3');
        cardTitle.classList.add('results__card-title');
        cardTitle.textContent = titleName;

        const cardText = document.createElement('p');
        cardText.classList.add('results__card-text');
        cardText.textContent = textDescription;

        const cardPortal = document.createElement('a');
        cardPortal.classList.add('results__card-portal');
        cardPortal.classList.add('link');
        cardPortal.href = `${portalLink}`;
        cardPortal.target = '_blank';
        cardPortal.textContent = portalText;

        cardDescription.appendChild(cardDate);
        cardDescription.appendChild(cardTitle);
        cardDescription.appendChild(cardText);
        cardDescription.appendChild(cardPortal);

        cardContainer.appendChild(cardPic);
        cardContainer.appendChild(cardDescription);

        return cardContainer;
    }
}