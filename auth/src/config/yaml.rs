use crate::config::AuthzConfig;
use serde_yaml::from_str;
use std::fs::File;
use std::io::prelude::*;

pub fn load_file(file: &str) -> AuthzConfig {
    let mut file = File::open(file).expect("Unable to open file");
    let mut contents = String::new();

    file.read_to_string(&mut contents)
        .expect("Unable to read file");

    let desearialized_yaml: AuthzConfig = from_str(&contents)
        .ok()
        .expect("Please make sure config has the correct format!");
    return desearialized_yaml;
}
