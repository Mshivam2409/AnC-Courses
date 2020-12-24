### API DOCUMENTATION

- **`/getAllCourses`** : Returns list of all courses in database
  ```Typescript
  Method : <GET>
  Request Headers : <>
  Request Body : <>
  Request Params : <>
  Response Type : <Array<Course>>
  ```
- **`/getCourse/:cid`** : Returns list of all courses in database
  ```Typescript
  Method : <GET>
  Request Headers : <>
  Request Body : <>
  Request Params : <ID_OF_REQUESETED_COURSE>
  Response Type : <Course>
  ```
- **`/secure/addCourse`** : Returns list of all courses in database
  ```Typescript
  Method : POST
  Request Headers : AUTH
  Request Body :
  ------
  *Multipart Form Data*
  Contents : Stringified <Course>
  Author : AUTHOR_OF_POST
  File1 : File
  File2 : File
  ... so on
  ------
  Request Params : <>
  Response Type : Array<Course>
  ```
- **`/secure/addFiles/:cid`** : Returns list of all courses in database
  ```Typescript
  Method : POST
  Request Headers : AUTH
  Request Body :
  ------
  *Multipart Form Data*
  File1 : File
  File2 : File
  ... so on
  ------
  Request Params : <ID_OF_COURSE>
  Response Type : Array<Course>
  ```
