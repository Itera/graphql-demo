const categories = [];
const movies = [];
const shows = [];
const episodes = [];
const persons = [];

module.exports = {
    categories,
    movies,
    shows,
    episodes,
    persons
};

let idCounter = 0;

const addEntry = (to, entry) => {
    to.push(entry);
};

const addChild = (item, name, child) => {
    let childList = item[name] || [];
    childList.push(child);
    item[name] = childList;
};

const addLink = (left, leftName, right, rightName) => {
    addChild(left, leftName, right);
    addChild(right, rightName, left);
};

const category = (title, id = idCounter++) => {
    const category = {
        itemType: "Category",
        id,
        title
    };
    addEntry(categories, category);
    return category;
};

const movie = (title, rating, year, categories, id = idCounter++) => {
    const movie = {
        itemType: "Movie",
        id,
        title,
        rating,
        year,
        categories: []
    };
    categories.forEach(category => {
        addLink(movie, "categories", category, "items");
    });
    addEntry(movies, movie);
    return movie;
};

const show = (title, rating, year, categories, id = idCounter++) => {
    const show = {
        itemType: "Show",
        id,
        title,
        rating,
        year,
        categories: []
    };
    categories.forEach(category => {
        addLink(show, "categories", category, "items");
    });
    addEntry(shows, show);
    return show;
};

const episode = (
    title,
    seasonNumber,
    episodeNumber,
    rating,
    show,
    id = idCounter++
) => {
    const episode = {
        itemType: "Episode",
        seasonNumber,
        episodeNumber,
        show,
        id,
        title,
        rating
    };
    addEntry(episodes, episode);
    addChild(show, "episodes", episode);
    return episode;
};

const person = (title, movies, shows = [], id = idCounter++) => {
    const person = { itemType: "Person", id, title, movies: [], shows: [] };
    addEntry(persons, person);
    [...movies, ...shows].forEach(item => {
        addLink(person, "actedIn", item, "cast");
    });
    return person;
};

// Categories
const drama = category("Drama");
const action = category("Action");
const comedy = category("Comedy");
const crime = category("Crime");
const adventure = category("Adventure");
const sciFi = category("Sci-Fi");
const thriller = category("Thriller");
const horror = category("Horror");
const mystery = category("Mystery");
const animation = category("Animation");
const aat = [action, adventure, thriller];

// Movies
const shaunOfTheDead = movie("Shaun of the Dead", 7.9, 2004, [comedy, horror]);
const hotFuzz = movie("Hot Fuzz", 7.8, 2007, [action, comedy, mystery]);
const missionImpossible = movie("Mission: Impossible", 7.1, 1996, aat);
const missionImpossibleII = movie("Mission: Impossible II", 6.1, 2000, aat);
const missionImpossibleIII = movie("Mission: Impossible III", 6.9, 2006, aat);
const missionImpossibleGhostProtocol = movie(
    "Mission: Impossible - Ghost Protocol",
    7.4,
    2011,
    aat
);
const missionImpossibleRogueNation = movie(
    "Mission: Impossible - Rogue Nation",
    7.4,
    2015,
    aat
);
const missionImpossibleFallout = movie(
    "Mission: Impossible - Fallout",
    7.8,
    2018,
    aat
);
const topGun = movie("Top Gun", 6.9, 1986, [action, drama]);
const kissKissBangBang = movie("Kiss Kiss Bang Bang", 7.5, 2005, [
    action,
    comedy,
    crime
]);

const everyMissionImpossible = [
    missionImpossible,
    missionImpossibleII,
    missionImpossibleIII,
    missionImpossibleGhostProtocol,
    missionImpossibleRogueNation,
    missionImpossibleFallout
];

// Show
const chernobyl = show("Chernobyl", 9.5, 2019, [drama, thriller]);
const gameOfThrones = show("Game of Thrones", 9.4, 2011, [
    action,
    adventure,
    drama
]);
const theBoys = show("The Boys", 8.8, 2019, [action, comedy, crime]);
const spaced = show("Spaced", 8.6, 1999, [action, comedy]);

// Episodes
episode("1:23:45", 1, 1, 9.5, chernobyl);
episode("Please Remain Calm", 1, 2, 9.7, chernobyl);
episode("Open Wide, O Earth", 1, 3, 9.6, chernobyl);
episode("The Happiness of All Mankind", 1, 4, 9.5, chernobyl);
episode("Vichnaya Pamyat", 1, 5, 9.9, chernobyl);

episode("The Iron Throne", 8, 6, 4.1, gameOfThrones);
episode("The Bells", 8, 5, 6.0, gameOfThrones);
episode("The Last of the Starks", 8, 4, 7.6, gameOfThrones);
episode("The Long Night", 8, 3, 7.5, gameOfThrones);
episode("A Night of the Seven Kingdoms", 8, 2, 7.9, gameOfThrones);
episode("Winterfell", 8, 1, 7.6, gameOfThrones);

episode("The Rains of Castamere", 3, 9, 9.9, gameOfThrones);
episode("Hardhome", 5, 8, 9.9, gameOfThrones);
episode("The Winds of Winter", 6, 10, 9.9, gameOfThrones);
episode("Battle of the Bastards", 6, 9, 9.9, gameOfThrones);
episode("The Spoils of War", 7, 4, 9.8, gameOfThrones);
episode("The Iron Throne", 8, 6, 4.1, gameOfThrones);

episode("Beginnings", 1, 1, 8.0, spaced);
episode("Gatherings", 1, 2, 7.7, spaced);
episode("Art", 1, 3, 8.1, spaced);
episode("Battles", 1, 4, 8.5, spaced);
episode("Chaos", 1, 5, 8.5, spaced);

episode("The Name of the Game", 1, 1, 8.8, theBoys);
episode("Cherry", 1, 2, 8.6, theBoys);
episode("Get Some", 1, 3, 8.6, theBoys);
episode("The Female of the Species", 1, 4, 8.9, theBoys);
episode("Good for the Soul", 1, 5, 8.5, theBoys);
episode("The Innocents", 1, 6, 8.4, theBoys);
episode("The Self-Preservation Society", 1, 7, 8.9, theBoys);
episode("You Found Me", 1, 8, 9.1, theBoys);

// Persons
person("Tom Cruise", [topGun, ...everyMissionImpossible]);
person("Val Kilmer", [topGun, kissKissBangBang]);
person("Ving Rhames", [...everyMissionImpossible]);
person("Michelle Monaghan", [
    kissKissBangBang,
    missionImpossibleIII,
    missionImpossibleGhostProtocol,
    missionImpossibleFallout
]);
person(
    "Simon Pegg",
    [
        shaunOfTheDead,
        hotFuzz,
        missionImpossibleIII,
        missionImpossibleGhostProtocol,
        missionImpossibleRogueNation,
        missionImpossibleFallout
    ],
    [theBoys, spaced]
);
person("Nick Frost", [shaunOfTheDead, hotFuzz], [spaced]);
person("Rebecca Ferguson", [
    missionImpossibleRogueNation,
    missionImpossibleFallout
]);
person("Emilia Clarke", [], [gameOfThrones]);
person("Peter Dinklage", [], [gameOfThrones]);
person("Lena Headey", [], [gameOfThrones]);
person("Kit Harington", [], [gameOfThrones]);
person("Sophie Turner", [], [gameOfThrones]);
person("Maisie Williams", [], [gameOfThrones]);
person("Nikolaj Coster-Waldau", [], [gameOfThrones]);
person("Rory McCann", [hotFuzz], [gameOfThrones]);
