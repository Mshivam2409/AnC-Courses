use clap::Clap;

/// This doc string acts as a help message when the user runs '--help'
/// as do all doc strings on fields
#[derive(Clap)]
#[clap(version = "1.0", author = "Mshivam2409 <shivammalhotra08@gmail.com>")]
pub struct Opts {
    /// Sets a custom config file. Could have been an Option<T> with no default too
    #[clap(short, long, default_value = "rogue.yml")]
    pub config: String,
}
