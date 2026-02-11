import { gql } from "graphql-request";

const GET_STAFF_LIST = gql`
  query GetStaffList($input: GetStaffListInput!) { 
    getStaffList(input: $input) { 
      items { 
        id 
        fullName
        avatar_url 
        timezone 
        isActive 
        isDeleted 
        createdAt 
        updatedAt
      } 
      total 
    } 
  }
`;

export const StaffService = {
  GET_STAFF_LIST,
};
