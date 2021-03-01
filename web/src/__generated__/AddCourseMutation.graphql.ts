/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type NewCourse = {
    title: string;
    number: string;
    credits: string;
    offered: string;
    contents: string;
    dept: string;
    author: string;
};
export type AddCourseMutationVariables = {
    course: NewCourse;
};
export type AddCourseMutationResponse = {
    readonly addCourse: {
        readonly ok: boolean;
        readonly message: string;
    } | null;
};
export type AddCourseMutation = {
    readonly response: AddCourseMutationResponse;
    readonly variables: AddCourseMutationVariables;
};



/*
mutation AddCourseMutation(
  $course: NewCourse!
) {
  addCourse(course: $course) {
    ok
    message
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "course"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "course",
        "variableName": "course"
      }
    ],
    "concreteType": "Response",
    "kind": "LinkedField",
    "name": "addCourse",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
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
    "name": "AddCourseMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddCourseMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2785ec88b136733cba80024b7c8b7fef",
    "id": null,
    "metadata": {},
    "name": "AddCourseMutation",
    "operationKind": "mutation",
    "text": "mutation AddCourseMutation(\n  $course: NewCourse!\n) {\n  addCourse(course: $course) {\n    ok\n    message\n  }\n}\n"
  }
};
})();
(node as any).hash = '4fcab1442668dc7e50e0b7bd9f1172c1';
export default node;
