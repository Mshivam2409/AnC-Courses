/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ModifyReviewMutationVariables = {
    reviewID: string;
    status: boolean;
};
export type ModifyReviewMutationResponse = {
    readonly modifyReview: {
        readonly id: string;
        readonly semester: string;
        readonly instructor: string;
        readonly grading: string;
        readonly course: string;
        readonly approved: boolean;
    };
};
export type ModifyReviewMutation = {
    readonly response: ModifyReviewMutationResponse;
    readonly variables: ModifyReviewMutationVariables;
};



/*
mutation ModifyReviewMutation(
  $reviewID: String!
  $status: Boolean!
) {
  modifyReview(reviewID: $reviewID, status: $status) {
    id
    semester
    instructor
    grading
    course
    approved
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reviewID"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "status"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "reviewID",
        "variableName": "reviewID"
      },
      {
        "kind": "Variable",
        "name": "status",
        "variableName": "status"
      }
    ],
    "concreteType": "Review",
    "kind": "LinkedField",
    "name": "modifyReview",
    "plural": false,
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
        "name": "semester",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "instructor",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "grading",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "course",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "approved",
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
    "name": "ModifyReviewMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ModifyReviewMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a902d25bad0573475b0eba9777e65a5e",
    "id": null,
    "metadata": {},
    "name": "ModifyReviewMutation",
    "operationKind": "mutation",
    "text": "mutation ModifyReviewMutation(\n  $reviewID: String!\n  $status: Boolean!\n) {\n  modifyReview(reviewID: $reviewID, status: $status) {\n    id\n    semester\n    instructor\n    grading\n    course\n    approved\n  }\n}\n"
  }
};
})();
(node as any).hash = '24a24e3ce539a5028afdb64d241317ae';
export default node;
