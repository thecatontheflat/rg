var RG = RG || {};

RG.listRenderer = {
    selectors: {
        container: 'container',
        person: 'person-',
        photo: 'photo-'
    },

    config: {
        personBlockHeight: 81,
        personsAmount: 0
    },

    dynamicConfig: {
        viewHeight: 0,
        personsInView: 0
    },

    personsContainer: {},
    persons: [],

    /**
     * Object entry point.
     * Should be called to configure all properties
     *
     * @param personsAmount
     */
    init: function (personsAmount) {
        RG.helper.init();

        this.config.personsAmount = personsAmount;
        this.personsContainer = document.getElementById(this.selectors.container);
        this.persons = RG.helper.getPersons(personsAmount);

        this.setContainerHeight();
        this.calculateViewHeight();
        this.calculatePersonsForFirstShow();

        this.bindScroll();

        this.renderInitialList(this.dynamicConfig.personsInView);
    },

    /**
     * Binds a function to the scroll event
     */
    bindScroll: function () {
        window.onscroll = this.getRecalculateItemsClosure();
    },

    /**
     * Returns closure, that contains all re-calculation logic
     *
     * The closure calculates the drag distance.
     * If the drag distance is enough (more than 1 person block height) -
     * only then we perform further calculations
     *
     * The logic of the further calculations is following:
     *      - calculate items that are currently present in the view
     *      - show them
     *      - hide some items before and after the currently presented
     *
     * @returns {Function}
     */
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
                var removableNodesBefore = personsBeforeCurrentView - 2;
                for (var i = personsBeforeCurrentView; i > removableNodesBefore; i--) {
                    if (i < 1) continue;
                    self.hidePersonNode(i);
                }

                // Show current view
                for (var p = personsBeforeCurrentView + 1; p <= personsIncludingCurrentView; p++) {
                    if (p > totalAmountOfPersons) continue;
                    self.showPersonNode(p);
                }

                // Hide after current view
                for (var k = personsIncludingCurrentView + 1; k <= personsIncludingCurrentView + 2; k++) {
                    if (k >= totalAmountOfPersons) continue;
                    self.hidePersonNode(k);
                }
            }
        }
    },

    /**
     * Hides a node
     *
     * @param counter
     */
    hidePersonNode: function (counter) {
        var personNode = document.getElementById(this.selectors.person + counter);
        if (!personNode) return;
        if ('none' != personNode.style.display) {
            personNode.style.display = 'none';
        }
    },

    /**
     * Reveals a node
     *
     * @param counter
     */
    showPersonNode: function (counter) {
        var personNode = document.getElementById(this.selectors.person + counter);
        if (!personNode) return;

        var photoNode = document.getElementById(this.selectors.photo + counter);

        var photoNodeAttributes = photoNode.attributes;
        var realAvatar = photoNodeAttributes['data-src'].value;
        var currentAvatar = photoNodeAttributes['src'].value;
        if (realAvatar != currentAvatar) {
            photoNode.setAttribute('src', realAvatar);
        }

        personNode.style.display = 'table';
    },

    /**
     * Sets height of the items container
     * Since items are hidden initially with display none - we have to be able to scroll the page
     */
    setContainerHeight: function () {
        this.personsContainer.style.height = this.config.personsAmount * this.config.personBlockHeight + 'px';
    },

    /**
     * Sets the height of the viewport to the config
     */
    calculateViewHeight: function () {
        this.dynamicConfig.viewHeight = window.innerHeight;
    },

    /**
     * Sets the amount of initially displayed items
     */
    calculatePersonsForFirstShow: function () {
        var amount = this.dynamicConfig.viewHeight / this.config.personBlockHeight;
        amount = Math.round(amount);

        this.dynamicConfig.personsInView = amount;
    },

    /**
     * Renders the whole tree
     *
     * @param initialAmount
     */
    renderInitialList: function (initialAmount) {
        var nodes = '';
        var config = this.config;
        for (var i = 0; i < config.personsAmount; i++) {
            var person = this.persons[i];
            var offset = i * config.personBlockHeight;
            var displayedInitially = i < initialAmount;

            nodes += RG.helper.createTextNode(person, offset, displayedInitially);
        }

        this.personsContainer.innerHTML = nodes;
    }
};