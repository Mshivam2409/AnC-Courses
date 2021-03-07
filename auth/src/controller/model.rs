#![allow(proc_macro_derive_resolution_fallback)]
use mongodb::bson;
use serde_derive::{Deserialize, Serialize};
use strum_macros;

#[derive(Serialize, Deserialize, Debug, Clone, strum_macros::ToString)]
pub enum Roles {
    User,
    Secretary,
    Coordinator,
    Admin,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Client {
    #[serde(rename = "_id")] // Use MongoDB's special primary key field name when serializing
    pub id: Option<bson::oid::ObjectId>,
    pub name: Option<String>,
    pub email: Option<String>,
    pub index: Option<i32>,
    pub roles: Option<Roles>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct InsertableClient {
    pub name: Option<String>,
    pub email: Option<String>,
    pub roles: Option<Roles>,
}

impl InsertableClient {
    fn from_client(client: Client) -> InsertableClient {
        InsertableClient {
            name: client.name,
            email: client.email,
            roles: client.roles,
        }
    }
}
