import {GET_SIMILAR_AD} from './data.js';

GET_SIMILAR_AD;

const formCard = document.querySelector('#map-canvas');

const templateFragmentCard = document.querySelector('#card').content;
const templateCard = templateFragmentCard.querySelector('article');

const fragment = document.createDocumentFragment();
const cards = [];

//Вывод типа жилья (квартира, бунгало, дом и т.д.)

const CHOOSE_OFFER_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const typeObjectValue = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const keysOfferType = Object.keys(typeObjectValue);
const valuesOfferType = Object.values(typeObjectValue);

const getObjectValue = (array, keys, values) => {
  for (let arrCounter = 0; arrCounter <= array.length; arrCounter++) {
    let arrType = [];
    arrType = array[arrCounter];
    for(let arrCounterKey = 0; arrCounterKey <= keys.length; arrCounterKey++) {
      if (arrType === keys[arrCounterKey]) {
        let typeValue = [];
        typeValue = values[arrCounterKey];
        return typeValue;
      }
    }
  }
};

//Карточка объявления

for (let arrCounterCard = 0; arrCounterCard <= GET_SIMILAR_AD.length - 1; arrCounterCard++) {
  const elementCard = templateCard.cloneNode(true);
  const popupTitle = elementCard.querySelector('.popup__title');
  popupTitle.textContent = GET_SIMILAR_AD[arrCounterCard].offer.title;
  const popupAddress = elementCard.querySelector('.popup__text--address');
  popupAddress.textContent = GET_SIMILAR_AD[arrCounterCard].offer.address;
  const popupPrice = elementCard.querySelector('.popup__text--price');
  popupPrice.textContent = `${GET_SIMILAR_AD[arrCounterCard].offer.price} ₽/ночь`;
  const popupType = elementCard.querySelector('.popup__type');
  popupType.textContent = getObjectValue(CHOOSE_OFFER_TYPE, keysOfferType, valuesOfferType);

  const popupCapacity = elementCard.querySelector('.popup__text--capacity');
  popupCapacity.textContent = `${GET_SIMILAR_AD[arrCounterCard].offer.rooms} комнаты для ${GET_SIMILAR_AD[arrCounterCard].offer.guests} гостей.`;
  const popupTime = elementCard.querySelector('.popup__text--time');
  popupTime.textContent = `Заезд после ${GET_SIMILAR_AD[arrCounterCard].offer.checkin}, выезд до ${GET_SIMILAR_AD[arrCounterCard].offer.checkout}`;

  //Вывод доступных удобств в номере

  const popupFeatures = elementCard.querySelector('.popup__features');

  const featuresModifiers = GET_SIMILAR_AD[arrCounterCard].offer.features.map((feature) => `popup__feature--${feature}`);
  popupFeatures.querySelectorAll('.popup__feature').forEach((item) => {
    const featureModifier = item.classList[1];
    if (!featuresModifiers.includes(featureModifier)) {
      item.remove();
      return featuresModifiers;
    }
  });

  const popupDescription = elementCard.querySelector('.popup__description');
  popupDescription.textContent = GET_SIMILAR_AD[arrCounterCard].offer.description;

  //Вывод всех фото объявления

  const popupPhotos = elementCard.querySelector('.popup__photos');

  popupPhotos.querySelectorAll('.popup__photo').forEach((item) => {
    item.src = GET_SIMILAR_AD[arrCounterCard].offer.photos;
  });

  const popupAvatar = elementCard.querySelector('.popup__avatar');
  popupAvatar.src = GET_SIMILAR_AD[arrCounterCard].author.avatar;


  cards.push(elementCard);
}

fragment.appendChild(cards[0]);
formCard.appendChild(fragment);

export {
  formCard
};
