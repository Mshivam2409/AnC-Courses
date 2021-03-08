use mongodb::sync;

pub fn connect(uri: &str, dbname: &str) -> sync::Database {
    let client = sync::Client::with_uri_str(uri).expect("Unable to conn");
    let database = client.database(dbname);
    return database;
}
