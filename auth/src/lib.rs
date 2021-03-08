#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;
extern crate fern;
mod config;
mod controller;
mod db;
mod graphql;
use mongodb::sync::Database;
use rocket::{catch, Request, Rocket};
use rocket_contrib::json::Json;

extern crate chrono;

pub fn setup_logger() -> Result<(), fern::InitError> {
    fern::Dispatch::new()
        .format(|out, message, record| {
            out.finish(format_args!(
                "{}[{}][{}] {}",
                chrono::Local::now().format("[%Y-%m-%d][%H:%M:%S]"),
                record.target(),
                record.level(),
                message
            ))
        })
        .level(log::LevelFilter::Info)
        .chain(std::io::stdout())
        .chain(fern::log_file("output.log")?)
        .apply()?;
    Ok(())
}

#[catch(500)]
fn internal_error() -> &'static str {
    "Whoops! Looks like we messed up."
}

#[catch(404)]
fn not_found(req: &Request) -> String {
    format!("I couldn't find '{}'. Try something else?", req.uri())
}

#[post("/graphql", format = "json", data = "<req>")]
fn index(
    req: Json<graphql::GraphQLRequest>,
    state: rocket::State<Database>,
    token: Token,
) -> rocket::http::Status {
    let parsed_req = graphql::parse_graphql(&req.query);
    let client = &state;
    controller::check_access(&parsed_req.name, &token.0, client.inner())
}

struct Token(String);

#[derive(Debug)]
enum ApiTokenError {
    Missing,
}

impl<'a, 'r> rocket::request::FromRequest<'a, 'r> for Token {
    type Error = ApiTokenError;

    fn from_request(request: &'a Request<'r>) -> rocket::request::Outcome<Self, Self::Error> {
        let token = request.headers().get_one("X-Kratos-User");
        match token {
            Some(token) => {
                // check validity
                rocket::Outcome::Success(Token(token.to_string()))
            }
            None => rocket::Outcome::Failure((
                rocket::http::Status::Unauthorized,
                ApiTokenError::Missing,
            )),
        }
    }
}

pub fn rogue_init() -> Rocket {
    let config = config::Config::get();

    rocket::ignite()
        .register(catchers![internal_error, not_found])
        .manage(db::connect(&config.mongo_url, "primarydb"))
        .mount("/", routes![index])
}
