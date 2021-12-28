import { gql } from "@apollo/client";

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($id: ID!, $status: Status!) {
    updateTask(id: $id, status: $status) {
      id
      title
      content
      dueDate
      status
    }
  }
`;

// TODO 4.1 Create Task Mutation.
// Uncomment the following lines and fill the gql part
// export const CREATE_TASK_MUTATION = gql`
// `;
export const CREATE_TASK_MUTATION = gql`
mutation createTask($id: String!, $title: String!, $status: Status!, $content: String!, $dueDate: Date!){
  createTask(input: {id: $id title: $title status: $status content: $content dueDate: $dueDate}){
id
title
status
content
dueDate
  }
}
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;
