#![feature(proc_macro_hygiene, decl_macro)]
mod config;
mod graphql;
use rocket_contrib::json::Json;
use serde_derive::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Deserialize, Serialize, Debug)]
struct GraphQLRequest {
    query: String,
    variables: Option<HashMap<String, HashMap<String, String>>>,
}

#[macro_use]
extern crate rocket;

#[post("/graphql", format = "json", data = "<req>")]
fn index(req: Json<GraphQLRequest>) {
    let parsedReq = graphql::parse_graphql(&req.query);
}

fn main() {
    let file = "config.yaml";
    let conf = config::load_file(file);
    rocket::ignite().mount("/", routes![index]).launch();
}
