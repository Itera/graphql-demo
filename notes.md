# Notes

## Pros and Cons

### Pros of GraphQL
* Everything in one query. Even multiple separate queries
* Improved page load speed for complex data
* Less logic to implement when fetching complex data
* Front-end can change massively without touching the back-end
* Great if the design is not set in stone and likely to change. E.g start-ups, ab-testing of new features
* Self documenting. The schema is part of the code and can be provided as documentation.
* Front-end state handling is easier since it's just one api request.

### Cons of GraphQL
* Less mature, not well supported for all languages
* Need code to solve common problems like access-control, access limitations, caching
* Defining every field to fetch in the query can be more cumbersome in simple cases
* Likely to add additional logic to the front-end for building the queries.
* Overkill for simple use-cases
* Extra overhead for reading query, resolving fields, type checking
* More flexibility means less control and more difficult to optimize. 
* More difficult to guard against malicious attacks. DOS attacks can be performed by writing complex queries.

### Pros of REST
* Easy to proxy for load-balancing different parts of the api, authorization, limit requests per second, microservices
* Easy to cache, same url with same parameters can be cached.
* Mature. Lot's of existing tooling
* Less complicated front-end for simple cases. Just fetch a url 
* Easy to setup for simple cases

### Cons of REST
* Every resource has has a different url. This can mean multiple request to different apis to combine information.
* Extra front-end or back-end logic to fetch complex data.
* State management front-end is more complex with more api request. Especially with redux.
* Slower page load if complex data is fetched from front-end. Multiple api requests (often sequential) means more time waiting for data.
