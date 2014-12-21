var RG = RG || {};

RG.helper = {
    template: '',
    names: ["Sullivan Fuller","Whitfield Macdonald","Melody Douglas","Berger Keith","Mcgowan Rodriguez","Wilkerson Pearson","Farrell Kelley","Helene Whitney","Kim Brewer","Daugherty Franklin","Simon King","Mcintosh Harding","Sophie Morton","Chaney Boyd","Regina Russo","Harvey Foreman","Mclean Dean","Virgie Ingram","Ebony Mckay","Tracie Tillman","Williamson Ryan","Rogers Woodard","Rosalinda Simpson","Eula Gibson","Watts Bonner","Tamera Henderson","Esperanza Crosby","Atkins Bailey","Sadie Rios","Mia Caldwell","Elvia Kim","Glenna Carver","Galloway Manning","Kramer Collins","Daphne Grimes","Cruz Dunlap","Bertie Pennington","Rosanna Blanchard","Cash Drake","Maynard Conner","Barnes Kerr","Bright Carpenter","Mitchell Lopez","Wilkins Deleon","Day Bright","Roy Frye","Lawrence Goodman","Katelyn Dominguez","Harriet Foster","Latonya Santos","Horne Mcleod","Mayra Stout","Meghan Benton","Jerri Ramsey","Dunn Bush","Rosalie Vance","Warner Whitley","Wolfe Waller","Moss Russell","Olson Gomez","Russo Mendez","Lorie Haney","Payne Snider","Leblanc Gonzales","Ginger Alvarez","Dorthy Gould","Oconnor Williamson","Silva Garrison","Virginia Leon","Blair Bell","Wynn Sharpe","Ester Pate","Phelps Dennis","Leanna Gibbs","Viola Banks","Buck Miranda","Parker Daugherty","Dominguez Howe","Chris Molina","Wade Battle","Rhodes Leblanc","Alba Cain","Parks Hooper","Yvonne Summers","Sears Glenn","Fannie Park","Vega Randall","Gay Sullivan","Moran Irwin","Rush Cross","Kent Valentine","Amanda Wright","Palmer Franks","Lucinda Malone","Heath Perry","Hampton Sandoval","Hayden Kemp","Small Slater","Woods Walter","Compton Bass","Harrell Oneill","Nelson Workman","Bass Marsh","Coleen Montoya","Hopkins Joyner","Deena Kirkland","Cassandra Sellers","Johnnie Finley","Dudley Benjamin","Stokes Vincent","Kathie Murphy","Jody Avila","Koch Frost","Terrie Reyes","Robbie Willis","Minerva Anderson","Aguirre Aguilar","Sasha Bernard","Kirsten Mcgee","Bernadette Mcfarland","Pacheco Nieves","Huber Terry","Cote Finch","George Juarez","Beasley Rasmussen","Gabrielle Casey","Short Velez","Nora Brennan","Mendez Gaines","Sybil Cox","Sutton Robertson","Briggs Gregory","Green Marquez","Rachel Bradshaw","Sally Cummings","Lyons Navarro","Jolene Wilkins","Estelle Mclean","Lewis Huff","Kinney Hess","Catherine Morris","Newman Townsend","Natasha Pace","Erickson Kane","Susanne Mcconnell","Kristi Mack","Singleton Herring","Holt Kinney","Eloise Pugh","Wagner Ferrell","Alvarez Weaver","Emma Payne","Frost Wilkinson","Clarke Steele","Hall Sanford","Alberta Wiley","Durham Rivas","Rosemary Day","Terry Watson","Liza Camacho","Peck Travis","Mariana Blevins","Downs Thompson","Mercedes Valdez","Rodriquez Jennings","Hillary Fisher","Lana Fox","Ferguson Suarez","Renee Cervantes","Sparks Holder","Dorothea Clarke","Kristine Clemons","Daisy Dillard","Summers Yates","Hewitt Green","Burris Rose","Agnes Robles","Tammie Klein","Bernice Webster","Morgan Hart","Mable Reilly","Robles Whitehead","Gale Ortega","Maryellen Hartman","Raquel Solis","Mayo Faulkner","Duffy Copeland","Beck Atkins","Trina Padilla","Copeland Knapp","Valenzuela Chaney","Pena Schwartz","Martinez Kirby","Marks Acevedo","Erna Shelton","Solomon Pruitt","Elba Frank","Augusta Stark","Lidia Hale","Lang Herrera","Merritt Becker","Harris Hester","Mara Hansen","Claudine Mcdonald","Delaney Farmer","Valentine Rosales","Walton Horton","Essie Shepard","Hinton Goff","Duncan Quinn","Maria Ballard","Blanca Rosa","Barton Rush","Ada Palmer","Mamie Oliver","Addie Miles","Donaldson Harvey","Jaclyn Turner","Corine Taylor","Cora Gallegos","Eunice Glass","Walls Alexander","Shelton Barnett","Lee Price","Carla Davenport","Elinor Shepherd","Frederick Cash","Snow Guerrero","Duran Nguyen","Glenda Cantu","Samantha Jacobs","Tiffany Crane","Conway Monroe","Rich Ware","Haynes Carroll","Larsen Burris","Ella Walsh","Trujillo Guzman","Stafford Page"],

    /**
     * Object entry point.
     * Should be called to configure all properties
     */
    init: function() {
        this.buildTemplate();
    },

    /**
     * Data layer imitation
     *
     * @param amount
     * @returns {Array}
     */
    getPersons: function (amount) {
        var fixtures = [];
        var img = 1;
        var nameId = 0;
        for (var i = 1; i <= amount; i++) {
            if (img > 10) img = 1;
            if (nameId > 239) nameId = 0;
            fixtures.push({
                id: i,
                name: this.names[nameId] + ' #' + i,
                img: 'public/img/' + img + '.jpeg'
            });
            img++;
            nameId++;
        }

        return fixtures;
    },

    /**
     * This method parses the template and replaces tokens with values
     * Returns string representation of the new node
     *
     * @param person
     * @param offset
     * @param displayed
     *
     * @returns {string}
     */
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

    /**
     * Method for template initialization
     * concat() function is used for better readability
     */
    buildTemplate: function () {
        this.template = String().concat(
            '<div class="person" id="person-%%_id_%%" style="display: %%_display_%%; top: %%_top_%%px">',
                '<img class="photo" id="photo-%%_photo_id_%%" data-src="%%_avatar_%%" src="%%_dummy_avatar_%%">',
               '<p class="name">%%_name_%%</a>',
            '</div>'
        );
    }
};