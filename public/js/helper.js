var RG = RG || {};

RG.helper = {
    template: '',

    init: function() {
        this.buildTemplate();
    },

    getPersons: function (amount) {
        var fixtures = [];
        var img = 1;
        for (var i = 1; i <= amount; i++) {
            if (img > 10) img = 1;
            fixtures.push({
                id: i,
                name: 'King George ' + i,
                img: 'public/img/' + img + '.jpeg'
            });
            img++;
        }

        return fixtures;
    },

    createTextNode: function (person, offset, displayed) {
        var imagePath = person.img + '?v=' + person.id;
        var fakeImage = 'public/img/0.jpeg';

        var textNode = this.template
            .replace('%%_id_%%', person.id)
            .replace('%%_photo_id_%%', person.id)
            .replace('%%_avatar_%%', imagePath)
            .replace('%%_top_%%', offset)
            .replace('%%_name_%%', person.name);

        var displayStyle = 'none';
        var image = fakeImage;
        if (displayed) {
            displayStyle = 'table';
            image = imagePath;
        }
        textNode = textNode
            .replace('%%_dummy_avatar_%%', image)
            .replace('%%_display_%%', displayStyle);


        return textNode;
    },

    buildTemplate: function () {
        this.template = String().concat(
            '<div class="person" id="person-%%_id_%%" style="display: %%_display_%%; top: %%_top_%%px">',
                '<img class="photo" id="photo-%%_photo_id_%%" data-src="%%_avatar_%%" src="%%_dummy_avatar_%%">',
               '<p class="name">%%_name_%%</a>',
            '</div>'
        );
    }
};