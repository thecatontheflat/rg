var SG = SG || {};

SG.listRenderer = {
    selectors: {
        container: 'container'
    },

    config: {
        personBlockHeight: '81',
        personsAmount: '500'
    },

    dynamicConfig: {
        viewHeight: '0',
        personsToShowFirst: '0'
    },

    personsContainer: {},
    persons: [],

    init: function () {
        this.personsContainer = document.getElementById(this.selectors.container);
        this.persons = this.getPersons();

        this.setContainerHeight();
        this.calculateViewHeight();
        this.calculatePersonsForFirstShow();

        this.bindScroll();

        this.appendPersonsToList(this.dynamicConfig.personsToShowFirst);
    },

    bindScroll: function () {
        var lastOffset = 0;
        var self = this;
        window.onscroll = function () {
            var currentOffset = window.pageYOffset || document.documentElement.scrollTop;
            var offsetDelta = currentOffset - lastOffset;

            if (offsetDelta > self.config.personBlockHeight) {
                var amountOfScrolledItems = offsetDelta / self.config.personBlockHeight;
                amountOfScrolledItems = Math.round(amountOfScrolledItems);
                self.appendPersonsToList(amountOfScrolledItems);

                lastOffset = currentOffset - (currentOffset % self.config.personBlockHeight);
            }
        };
    },

    setContainerHeight: function () {
        this.personsContainer.style.height = this.config.personsAmount * this.config.personBlockHeight + 'px';
    },

    calculateViewHeight: function () {
        this.dynamicConfig.viewHeight = window.innerHeight;
    },

    calculatePersonsForFirstShow: function () {
        var amount = this.dynamicConfig.viewHeight / this.config.personBlockHeight;
        amount = Math.round(amount);

        this.dynamicConfig.personsToShowFirst = amount;
    },

    appendPersonsToList: function (amount) {
        var nodes = [];
        var persons = this.persons.splice(0, amount);
        for (var i = 0; i < persons.length; i++) {
            var person = persons[i];

            nodes.push(this.createTextNode(person));
        }

        this.personsContainer.innerHTML += nodes.join('');
    },

    createTextNode: function (person) {
        return this.getTemplate()
            .replace('%%_id_%%', person.id)
            .replace('%%_avatar_%%', person.img)
            .replace('%%_name_%%', person.name);
    },

    getPersons: function () {
        var fixtures = [];
        var img = 1;
        for (var i = 1; i <= this.config.personsAmount; i++) {
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