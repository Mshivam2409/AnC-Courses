use serde_derive::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Deserialize, Serialize, Debug)]
pub struct GraphQLRequest {
    pub query: String,
    pub variables: Option<HashMap<String, HashMap<String, String>>>,
}

pub struct ParsedReq {
    pub query: ReqType,
    pub name: String,
}

pub enum ReqType {
    Mutation,
    Query,
    Unknown,
}
