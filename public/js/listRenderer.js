var SG = SG || {};

SG.listRenderer = {
    selectors: {
        container: 'container'
    },

    config: {
        personBlockHeight: '81',
        personsAmount: '250'
    },

    dynamicConfig: {
        viewHeight: '0',
        personsInView: '0'
    },

    personsContainer: {},
    persons: [],
    template: '',

    init: function () {
        this.personsContainer = document.getElementById(this.selectors.container);
        this.persons = this.getPersons();

        this.buildTemplate();
        this.setContainerHeight();
        this.calculateViewHeight();
        this.calculatePersonsForFirstShow();

        this.bindScroll();

        this.renderInitialList(this.dynamicConfig.personsInView);
    },

    bindScroll: function () {
        window.onscroll = this.getRecalculateItemsClosure();
    },

    getRecalculateItemsClosure: function () {
        var lastOffset = 0;
        var self = this;
        return function () {
            var currentOffset = window.pageYOffset || document.documentElement.scrollTop;
            var offsetDelta = currentOffset - lastOffset;
            var personBlockHeight = self.config.personBlockHeight;
            var personsInView = self.dynamicConfig.personsInView;
            var totalAmountOfPersons = self.config.personsAmount;

            // Perform calculations only when the window was scrolled enough
            if (Math.abs(offsetDelta) >= personBlockHeight) {
                lastOffset = currentOffset - (currentOffset % personBlockHeight);

                // Calculating items in the current view
                var personsBeforeCurrentView = lastOffset / personBlockHeight;
                personsBeforeCurrentView = Math.ceil(personsBeforeCurrentView);
                var personsIncludingCurrentView = personsBeforeCurrentView + personsInView;

                // Hide before current view
                var personNode;
                var removableNodesBefore = personsBeforeCurrentView - 2;
                for (var i = personsBeforeCurrentView; i > removableNodesBefore; i--) {
                    if (i < 1) continue;
                    self.hidePersonNode(i);
                }

                // Show current view
                for (var p = personsBeforeCurrentView + 1; p <= personsIncludingCurrentView; p++) {
                    personNode = document.getElementById('person-' + p);
                    var photoNode = document.getElementById('photo-' + p);
                    var avatar = photoNode.getAttribute('data-src');
                    photoNode.setAttribute('src', avatar);
                    personNode.style.display = 'table';
                }

                // Hide after current view
                for (var k = personsIncludingCurrentView + 1; k <= personsIncludingCurrentView + 2; k++) {
                    if (k >= totalAmountOfPersons) continue;
                    self.hidePersonNode(k);
                }
            }
        }
    },

    hidePersonNode: function(counter) {
        var personNode = document.getElementById('person-' + counter);
        if ('none' != personNode.style.display) {
            personNode.style.display = 'none';
        }
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

        this.dynamicConfig.personsInView = amount;
    },

    renderInitialList: function (initialAmount) {
        var nodes = [];
        var config = this.config;
        for (var i = 0; i < config.personsAmount; i++) {
            var person = this.persons[i];
            var offset = i * config.personBlockHeight;
            var displayed = i < initialAmount;

            nodes.push(this.createTextNode(person, offset, displayed));
        }

        this.personsContainer.innerHTML += nodes.join('');
    },

    createTextNode: function (person, offset, displayed) {
        var textNode = this.template
            .replace('%%_id_%%', person.id)
            .replace('%%_photo_id_%%', person.id)
            .replace('%%_avatar_%%', person.img + '?v=' + person.id)
            .replace('%%_top_%%', offset)
            .replace('%%_name_%%', person.name);

        textNode = displayed ? textNode.replace('%%_display_%%', 'table') : textNode.replace('%%_display_%%', 'none');

        return textNode;
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

    buildTemplate: function () {
        this.template = String().concat(
            '<div class="person" id="person-%%_id_%%" style="display: %%_display_%%; top: %%_top_%%px">',
            '<img class="photo" id="photo-%%_photo_id_%%" data-src="%%_avatar_%%" src="public/img/0.jpeg">',
            '<p class="name">%%_name_%%</a>',
            '</div>'
        );
    }
};