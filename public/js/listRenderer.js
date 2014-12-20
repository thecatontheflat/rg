var SG = SG || {};

SG.listRenderer = {
    selectors: {
        container: 'container'
    },

    init: function () {

    },

    render: function () {
        var personsContainer = document.getElementById(this.selectors.container);
        var persons = this.getFixtures(500);

        var nodes = [];
        for (var i = 0; i < persons.length; i++) {
            var person = persons[i];

            nodes.push(this.createNode(person));
        }

        personsContainer.innerHTML = nodes.join('');
    },

    createNode: function (person) {
        return this.getTemplate()
            .replace('%%_id_%%', person.id)
            .replace('%%_avatar_%%', person.img)
            .replace('%%_name_%%', person.name);
    },

    getFixtures: function (amount) {
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

    getTemplate: function () {
        return ''.concat(
            '<div class="person" id="%%_id_%%">',
            '<img class="photo" src="%%_avatar_%%">',
            '<p class="name">%%_name_%%</a>',
            '</div>'
        );
    }
};