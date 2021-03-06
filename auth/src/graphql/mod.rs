mod parser;

pub use parser::parse_graphql;

pub struct ParsedReq {
    pub query: ReqType,
    pub name: String,
}

pub enum ReqType {
    Mutation,
    Query,
    Unknown,
}
