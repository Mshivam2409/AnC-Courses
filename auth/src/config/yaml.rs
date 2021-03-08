use super::cli::Opts;
use clap::Clap;
use lazy_static::lazy_static;
use log::info;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::{fs, io};

/**
 * Our primary structure to unwrap the config file.
 */
#[derive(Debug, PartialEq, Serialize, Deserialize, Clone)]
pub struct Config {
    pub mongo_url: String,
    pub graphql: HashMap<String, Vec<String>>,
}

lazy_static! {
    /**
     * Static global variable for config.
     */
    static ref CONFIG: Config = Config::init();
}

/**
 * Implementations for config file.
 */
impl Config {
    fn init() -> Self {
        let opts: Opts = Opts::parse();
        info!("Trying to read config file {}", opts.config);
        let contents = Self::read_config_file(&opts.config).unwrap();
        info!("Config file successfully read!");
        return serde_yaml::from_str(&contents).unwrap();
    }

    pub fn get() -> Self {
        CONFIG.to_owned()
    }

    pub fn read_config_file(file: &str) -> Result<String, io::Error> {
        fs::read_to_string(format!("{}", file))
    }
}
