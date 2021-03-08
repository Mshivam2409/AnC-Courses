use crate::graphql::{ParsedReq, ReqType};
use graphql_parser::query::{parse_query, Definition::Operation};

pub fn parse_graphql(query: &String) -> ParsedReq {
    let ast = parse_query(query).unwrap();
    if let Operation(op) = &ast.definitions[0] {
        if let graphql_parser::query::OperationDefinition::Mutation(m) = op {
            return ParsedReq {
                query: ReqType::Mutation,
                name: m.name.as_ref().unwrap().to_string(),
            };
        }
        if let graphql_parser::query::OperationDefinition::Query(q) = op {
            return ParsedReq {
                query: ReqType::Query,
                name: q.name.as_ref().unwrap().to_string(),
            };
        }
    };
    return ParsedReq {
        query: ReqType::Unknown,
        name: "".to_string(),
    };
}
