/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CourseQueryVariables = {
    cid: string;
};
export type CourseQueryResponse = {
    readonly getCourseData: {
        readonly course: {
            readonly title: string;
            readonly number: string;
            readonly credits: string;
            readonly offered: string;
            readonly contents: string;
            readonly author: string;
            readonly driveFiles: ReadonlyArray<string>;
            readonly id: string;
            readonly dept: string;
        };
        readonly reviews: ReadonlyArray<{
            readonly id: string;
            readonly semester: string;
            readonly instructor: string;
            readonly grading: string;
            readonly approved: boolean;
        }>;
    };
};
export type CourseQuery = {
    readonly response: CourseQueryResponse;
    readonly variables: CourseQueryVariables;
};



/*
query CourseQuery(
  $cid: String! = "ESC101"
) {
  getCourseData(number: $cid) {
    course {
      title
      number
      credits
      offered
      contents
      author
      driveFiles
      id
      dept
    }
    reviews {
      id
      semester
      instructor
      grading
      approved
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": "ESC101",
    "kind": "LocalArgument",
    "name": "cid"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "number",
        "variableName": "cid"
      }
    ],
    "concreteType": "CourseData",
    "kind": "LinkedField",
    "name": "getCourseData",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Course",
        "kind": "LinkedField",
        "name": "course",
        "plural": false,
        "selections": [
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "offered",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "contents",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "author",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "driveFiles",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "dept",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Review",
        "kind": "LinkedField",
        "name": "reviews",
        "plural": true,
        "selections": [
          (v1/*: any*/),
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
            "name": "approved",
            "storageKey": null
          }
        ],
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
    "name": "CourseQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CourseQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "3387574956c4008b1c0ed893be368131",
    "id": null,
    "metadata": {},
    "name": "CourseQuery",
    "operationKind": "query",
    "text": "query CourseQuery(\n  $cid: String! = \"ESC101\"\n) {\n  getCourseData(number: $cid) {\n    course {\n      title\n      number\n      credits\n      offered\n      contents\n      author\n      driveFiles\n      id\n      dept\n    }\n    reviews {\n      id\n      semester\n      instructor\n      grading\n      approved\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '9ce1dadc2eb9c354d12aac987246b27d';
export default node;
