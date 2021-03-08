import { ModifyReviewMutation } from '__generated__/ModifyReviewMutation.graphql';
import { message } from 'antd';
import { commitMutation, Environment, graphql } from 'react-relay';

// We start by defining our mutation from above using `graphql`
const mutation = graphql`
  mutation ModifyReviewMutation($reviewID: String! , $status: Boolean!) {
    modifyReview(reviewID: $reviewID, status: $status) {
        id
  semester
  instructor
  grading
  course
  approved
    }
  }
`;

function commit(
    environment: Environment,
    reviewID: ModifyReviewMutation["variables"]["reviewID"],
    status: ModifyReviewMutation["variables"]["status"],
) {
    // Now we just call commitMutation with the appropriate parameters
    return commitMutation<ModifyReviewMutation>(
        environment,
        {
            mutation,
            variables: {
                reviewID,
                status
            },
            onCompleted: (resp, err) => {
                if (err) {
                    message.error("Unable to Add Review!")
                }
                else {
                    message.success("Successfully Added Review! Awaiting Approval!")
                }
            },
            onError: (err) => { message.error(err.message) },
            optimisticUpdater: (store, data) => { console.log(store.getRoot().getLinkedRecord("603e34b7bca261ed73e63eee")) },
            updater: (store, data) => { (window as any)["store"] = store; }
        }
    );
}

export default { commit };