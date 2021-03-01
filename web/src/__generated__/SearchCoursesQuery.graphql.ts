/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SearchParams = {
    identifier: string;
};
export type SearchCoursesQueryVariables = {
    params: SearchParams;
};
export type SearchCoursesQueryResponse = {
    readonly searchCourses: ReadonlyArray<{
        readonly id: string;
        readonly title: string;
        readonly number: string;
        readonly credits: string;
    }>;
};
export type SearchCoursesQuery = {
    readonly response: SearchCoursesQueryResponse;
    readonly variables: SearchCoursesQueryVariables;
};



/*
query SearchCoursesQuery(
  $params: SearchParams!
) {
  searchCourses(params: $params) {
    id
    title
    number
    credits
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "params"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "params",
        "variableName": "params"
      }
    ],
    "concreteType": "Course",
    "kind": "LinkedField",
    "name": "searchCourses",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "number",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "credits",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchCoursesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SearchCoursesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "83b6a2d036a3a676b1de911577394ba5",
    "id": null,
    "metadata": {},
    "name": "SearchCoursesQuery",
    "operationKind": "query",
    "text": "query SearchCoursesQuery(\n  $params: SearchParams!\n) {\n  searchCourses(params: $params) {\n    id\n    title\n    number\n    credits\n  }\n}\n"
  }
};
})();
(node as any).hash = '975ffe82564e408d18044ee2c4096bd5';
export default node;
