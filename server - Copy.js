var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
	type Patient {
		name: String
		id: Int
	}
    type Query {
         areaOfCircle(radius: Float): Float
    }
`);
// Root resolver
var root = {
    areaOfCircle: ({radius}) => {
		return Math.PI * radius;
    },
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
