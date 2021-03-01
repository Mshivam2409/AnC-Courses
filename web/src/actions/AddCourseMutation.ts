import { graphql, commitMutation, Environment } from 'react-relay';
import { AddCourseMutation } from '__generated__/AddCourseMutation.graphql';

// We start by defining our mutation from above using `graphql`
const mutation = graphql`
  mutation AddCourseMutation($course: NewCourse!) {
    addCourse(course: $course) {
      ok 
      message
    }
  }
`;

function commit(
    environment: Environment,
    course: AddCourseMutation["variables"]["course"],
) {
    // Now we just call commitMutation with the appropriate parameters
    return commitMutation<AddCourseMutation>(
        environment,
        {
            mutation,
            variables: {
                course: course,
            },
        }
    );
}

export default { commit };