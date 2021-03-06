#![allow(proc_macro_derive_resolution_fallback)]

// pub mod handler;
// pub mod repository;
use mongodb::bson;
use serde_derive::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
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
    pub roles: Option<Vec<Roles>>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct InsertableClient {
    pub name: Option<String>,
    pub email: Option<String>,
    pub roles: Option<Vec<Roles>>,
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
