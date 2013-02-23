$(function () {
    var imagesDisplay = $('#images');
    var imageUrlBase = 'http://dominion.lqbs.fr/cards/';

    function displayCardsList(cardsList) {
        // clean images list
        imagesDisplay.empty();

        cardsList = cardsList.replace(' and ', '').split(',');

        for (var i in cardsList) {
            if (cardsList[i] === '') {
                continue;
            }

            var card = cardsList[i].trim().toLowerCase();
            var cardData = cards[cardLookupByName[card]];

            if (cardData === undefined) {
                // the card does not exist, let's not try to display it
                continue;
            }

            var imageName = card.replace(/\W/g, '');
            var extension = sets[cardData.setId].name.toLowerCase();
            var imageUrl = imageUrlBase + extension + '/' + imageName + '.jpg';

            var image = $('<img/>', {'src': imageUrl, 'alt': cardData.name});
            imagesDisplay.append(image);
        }
    }

    function getCardsListFromQueryString() {
        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(window.location.search);
            if (results == null) {
                return "";
            }
            else {
                return decodeURIComponent(results[1].replace(/\+/g, " "));
            }
        }

        return getParameterByName('cards');
    }

    function updateCardsList() {
        var cardsList = getCardsListFromQueryString();
        if (cardsList !== '') {
            $('#cardslist').val(cardsList);
            displayCardsList(cardsList);
        }
    }

    window.onpopstate = updateCardsList;

    // On button click
    $('#generate').click(function (e) {
        e.preventDefault();
        var cardsList = $('#cardslist').val();

        // update browser history
        history.pushState({}, '', '?cards=' + cardsList);

        displayCardsList(cardsList);
    });

    updateCardsList();
});
