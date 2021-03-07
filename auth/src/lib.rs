#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;
mod config;
mod controller;
mod db;
mod graphql;
use mongodb::sync::Database;
use rocket::{catch, Request, Rocket};
use rocket_contrib::json::Json;
use serde_derive::{Deserialize, Serialize};
use std::collections::HashMap;

#[catch(500)]
fn internal_error() -> &'static str {
    "Whoops! Looks like we messed up."
}

#[catch(400)]
fn not_found(req: &Request) -> String {
    format!("I couldn't find '{}'. Try something else?", req.uri())
}

#[derive(Deserialize, Serialize, Debug)]
struct GraphQLRequest {
    query: String,
    variables: Option<HashMap<String, HashMap<String, String>>>,
}

#[post("/graphql", format = "json", data = "<req>")]
fn index(req: Json<GraphQLRequest>, state: rocket::State<Database>) {
    let parsed_req = graphql::parse_graphql(&req.query);
    let client = &state;
    print!("{}", client.name());
    println!("{:?}", parsed_req.name)
}

pub fn rocket() -> Rocket {
    let config = config::Config::get();

    rocket::ignite()
        .register(catchers![internal_error, not_found])
        .manage(db::connect(&config.mongo_url, "a"))
        .mount("/", routes![index])
}
