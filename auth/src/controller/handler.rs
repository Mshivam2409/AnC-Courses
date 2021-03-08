use super::model::{Client, Roles};
use crate::config::Config;
use mongodb::{bson, bson::doc, sync};
use rocket::http::Status;

/**
 * Queries the user's database to check whether the user has permission to perform the query/mutation.
 */
pub fn check_access(queryname: &str, email: &str, connection: &sync::Database) -> Status {
    let config = Config::get();
    if config.graphql[queryname].contains(&String::from("*")) {
        return Status::Ok;
    }
    let client = connection.collection("students").find_one(
        doc! {
              "email": email
        },
        None,
    );
    let res: Status;
    match client {
        Ok(c) => {
            let existing_client: Client =
                bson::from_bson(bson::Bson::Document(c.ok_or(Status::Forbidden).unwrap()))
                    .ok()
                    .unwrap();
            // let config = Config::get();
            if config.graphql[queryname]
                .contains(&existing_client.roles.unwrap_or(Roles::User).to_string())
            {
                res = Status::Ok;
            } else {
                res = Status::Forbidden;
            }
        }
        Err(_) => res = Status::Forbidden,
    };
    return res;
}
