mod parser;

pub use parser::parse_graphql;

pub struct ParsedReq {
    query: ReqType,
    name: String,
}

pub enum ReqType {
    Mutation,
    Query,
    Unknown,
}
