#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
mod config;
mod controller;
mod db;
mod graphql;
use lazy_static::lazy_static;
// use rocket_contrib::databases::mongodb;
use mongodb::sync::Database;
use rocket_contrib::json::Json;
use serde_derive::{Deserialize, Serialize};
use std::collections::HashMap;

lazy_static! {
    // let file = "authz.config.yml";
    static ref Conf : config::AuthzConfig= config::load_file("authz.config.yml");
    // static ref MongoClient: sync::Database = db::connect(Conf.__private_field.query);
}

#[derive(Deserialize, Serialize, Debug)]
struct GraphQLRequest {
    query: String,
    variables: Option<HashMap<String, HashMap<String, String>>>,
}

struct RocketState {
    pub client: Database,
}

// #[database("mongodb")]
// struct MongoDbConn(mongodb::db::Database);

#[post("/graphql", format = "json", data = "<req>")]
fn index(req: Json<GraphQLRequest>, state: rocket::State<RocketState>) {
    let parsed_req = graphql::parse_graphql(&req.query);
    let client = &state.client;
    print!("{}", client.name());
    println!("{:?}", parsed_req.name)
}

fn main() {
    let file = "authz.config.yml";
    let conf = config::load_file(file);
    // let url = conf.mongo_url.clone();
    let mdb = db::connect(&conf.mongo_url, "a");
    let state = RocketState { client: mdb };
    rocket::ignite()
        .manage(state)
        .mount("/", routes![index])
        .launch();
}
