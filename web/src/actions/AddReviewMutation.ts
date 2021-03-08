import { message } from 'antd';
import { graphql, commitMutation, Environment } from 'react-relay';
import { AddReviewMutation } from '__generated__/AddReviewMutation.graphql';
// We start by defining our mutation from above using `graphql`
const mutation = graphql`
  mutation AddReviewMutation($review: NewReview!) {
    addReview(review: $review) {
      ok 
      message
    }
  }
`;

function commit(
    environment: Environment,
    review: AddReviewMutation["variables"]["review"],
) {
    // Now we just call commitMutation with the appropriate parameters
    return commitMutation<AddReviewMutation>(
        environment,
        {
            mutation,
            variables: {
                review,
            },
            onCompleted: (resp, err) => {
                if (err) {
                    message.error("Unable to Add Review!")
                }
                else {
                    message.success("Successfully Added Review! Awaiting Approval!")
                }
            },
            onError: (err) => { message.error(err.message) }
        }
    );
}

export default { commit };