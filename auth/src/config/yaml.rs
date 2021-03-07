use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
use std::{env, fs, io};

pub static CONFIG_PREFIX: &str = "authz";
pub static APP_ENV: &str = "APP_ENV";

#[derive(Debug, PartialEq, Serialize, Deserialize, Clone)]
pub struct Config {
    pub mongo_url: String,
    pub graphql: GqlConfig,
}

#[derive(Debug, PartialEq, Serialize, Deserialize, Clone)]
pub struct GqlConfig {
    pub query: Option<Vec<GqlQuery>>,
    pub mutation: Option<Vec<GqlQuery>>,
}

#[derive(Debug, PartialEq, Serialize, Deserialize, Clone)]
pub struct GqlQuery {
    pub name: String,
    pub allow: Vec<String>,
}

lazy_static! {
    static ref CONFIG: Config = Config::init();
}

impl Config {
    fn init() -> Self {
        let env = Config::get_environment();
        let env = match env {
            Ok(e) => match e.as_ref() {
                "development" | "testing" | "production" => e,
                _ => String::from("development"),
            },
            Err(_) => String::from("development"),
        };

        let contents = Self::read_config_file(env.as_ref()).unwrap();
        return serde_yaml::from_str(&contents).unwrap();
    }

    pub fn get() -> Self {
        CONFIG.to_owned()
    }

    pub fn read_config_file(env: &str) -> Result<String, io::Error> {
        fs::read_to_string(format!("{}.{}.yml", CONFIG_PREFIX, env))
    }

    pub fn get_environment() -> Result<String, env::VarError> {
        env::var(APP_ENV)
    }
}
