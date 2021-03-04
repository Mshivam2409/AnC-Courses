use graphql_parser::query::{parse_query, ParseError};

pub fn parse() {
  let ast = parse_query::<&str>("query MyQuery { field1, field2 }")?;
  // Format canonical representation
  assert_eq!(
    format!("{}", ast),
    "\
query MyQuery {
  field1
  field2
}
"
  );
}
