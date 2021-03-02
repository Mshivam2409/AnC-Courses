/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type NewReview = {
    semester: string;
    instructor: string;
    grading: string;
    course: string;
};
export type AddReviewMutationVariables = {
    review: NewReview;
};
export type AddReviewMutationResponse = {
    readonly addReview: {
        readonly ok: boolean;
        readonly message: string;
    } | null;
};
export type AddReviewMutation = {
    readonly response: AddReviewMutationResponse;
    readonly variables: AddReviewMutationVariables;
};



/*
mutation AddReviewMutation(
  $review: NewReview!
) {
  addReview(review: $review) {
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
    "name": "review"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "review",
        "variableName": "review"
      }
    ],
    "concreteType": "Response",
    "kind": "LinkedField",
    "name": "addReview",
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
    "name": "AddReviewMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddReviewMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1c76f569432027c9083c869cd9b55a5a",
    "id": null,
    "metadata": {},
    "name": "AddReviewMutation",
    "operationKind": "mutation",
    "text": "mutation AddReviewMutation(\n  $review: NewReview!\n) {\n  addReview(review: $review) {\n    ok\n    message\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c7aaef46e41f2ccbbbc61d6c662099be';
export default node;
