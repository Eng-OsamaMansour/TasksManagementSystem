const projectResolver = require('./projects');
const taskResolver = require('./tasks');
const authResolver = require('./auth');
const rootResolver = {
    ...authResolver,
    ...taskResolver,
    ...projectResolver
}

module.exports = rootResolver;