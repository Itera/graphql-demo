const axios = require("axios");

const { movies, shows, episodes, categories, persons } = require("./dataset");

const resolvers = {
    Query: {
        search: searchResolver,
        getMovie: getItemResolver(movies),
        getCategory: getItemResolver(categories),
        getPerson: getItemResolver(persons)
    },
    Category: {
        items: itemsResolver("items")
    },
    Movie: {
        poster: posterResolver,
		cast: itemsResolver("cast"),
    },
    Show: {
		episodes: itemsResolver("episodes"),
		cast: itemsResolver("cast"),
    },
    Person: {
        name: item => item.title,
        movies: itemsResolver("movies")
    },
    CategorizedItem: {
        __resolveType: item => item.itemType
    },
    SearchResult: {
        __resolveType: item => item.itemType
    }
};

module.exports = {
    resolvers
};

function searchResolver(_, { query, sortBy, limit }) {
    const searchedItems = [
        ...searchList(categories, query),
        ...searchList(movies, query),
        ...searchList(shows, query),
        ...searchList(episodes, query),
        ...searchList(persons, query)
    ];
    const sortedItems = sortItems(searchedItems, sortBy);
    return limitItems(sortedItems, limit);
}

function getItemResolver(list) {
    return (_, { query }) => searchList(list, query)[0];
}


function itemsResolver(listOrKey) {
    const getItems = (listOrKey, item) => {
        if (typeof listOrKey === "string") {
            return item[listOrKey];
        } else {
            return listOrKey;
        }
    };

    return (item, { sortBy, limit, query }) => {
        const items = getItems(listOrKey, item);
        const searchedItems = searchList(items, query);
        const sortedItems = sortItems(searchedItems, sortBy);
        return limitItems(sortedItems, limit);
    };
}

function sortItems(items, sortBy) {
    if (sortBy === "RATING") {
        return items.slice().sort((a, b) => b.rating - a.rating);
    } else return items;
}

function limitItems(items, limit) {
    if (limit === undefined) return items;
    else return items.slice(0, limit);
}
function searchList(list, query) {
    if (!query) return list;

    const queries = query
        .toLowerCase()
        .split(/[^\w]/i)
        .map(query => query.trim());
    return list.filter(item => {
        const value = item.title.toLowerCase();
        return queries.every(query => value.includes(query));
    });
}

async function posterResolver(movie) {
    const apiUrl =
        "https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" +
        movie.title;
    return axios({ url: apiUrl, responseType: "json" }).then(response => {
        const movie = response.data.results[0];
        if (movie === undefined) return null;
        else {
            const { poster_path } = movie;
            return "http://image.tmdb.org/t/p/w500" + poster_path;
        }
    });
}
