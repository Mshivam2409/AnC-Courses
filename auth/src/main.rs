use rogue;

fn main() {
    match rogue::setup_logger() {
        Ok(_) => print!(""),
        Err(_) => print!(""),
    };
    rogue::rogue_init().launch();
}
