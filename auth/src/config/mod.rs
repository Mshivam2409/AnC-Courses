mod yaml;

use serde::{Deserialize, Serialize};
pub use yaml::load_file;

#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub struct AuthzConfig {
    pub mongo_url: String,
    pub graphql: GqlConfig,
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub struct GqlConfig {
    pub query: Option<Vec<GqlQuery>>,
    pub mutation: Option<Vec<GqlQuery>>,
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub struct GqlQuery {
    pub name: String,
    pub allow: Vec<String>,
}
