var SG = SG || {};

SG.listRenderer = {
    selectors: {
        container: 'container'
    },

    config: {
        personBlockHeight: '81',
        personsAmount: '3'
    },

    personsContainer: {},

    init: function () {
        this.personsContainer = document.getElementById(this.selectors.container);
        this.setContainerHeight();
        this.bindScroll();

        this.render();
    },

    bindScroll: function() {
        window.onscroll = function () {
        };
    },

    setContainerHeight: function() {
        this.personsContainer.style.height = '10' * this.config.personsAmount * this.config.personBlockHeight + 'px';
    },

    render: function () {
        var persons = this.getPersons(this.config.personsAmount);

        var nodes = [];
        for (var i = 0; i < persons.length; i++) {
            var person = persons[i];

            nodes.push(this.createNode(person));
        }

        this.personsContainer.innerHTML = nodes.join('');
    },

    createNode: function (person) {
        return this.getTemplate()
            .replace('%%_id_%%', person.id)
            .replace('%%_avatar_%%', person.img)
            .replace('%%_name_%%', person.name);
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

    getTemplate: function () {
        return String().concat(
            '<div class="person" id="%%_id_%%">',
            '<img class="photo" src="%%_avatar_%%">',
            '<p class="name">%%_name_%%</a>',
            '</div>'
        );
    }
};