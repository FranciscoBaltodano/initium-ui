import { gql, GraphQLClient } from "graphql-request";
import { domain, domainGraphql } from "./settings";

export async function GetUserInfo(token) {
    const response = await fetch(`${domain}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-control": "no-cache",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const error = new Error("Get user info failed");
      error.status = response.status;
      error.body = await response.json();
      throw error;
    }
  
    const data = await response.json();
    return data;
  }
  
export async function ActivateUser(code){
    const response = await fetch(`${domain}/user/code/${code}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Cache-control': 'no-cache',
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
    });
        
    if (!response.ok) {
        const error = new Error('Activate user failed');
        error.status = response.status;  
        error.body = await response.json(); 
        throw error;
    }

    const data = await response.json();
    return data;
}

export async function LoginUser(userLogin){
    const response = await fetch(`${domain}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLogin)
    });
        
    if (!response.ok) {
        const error = new Error('Login failed');
        error.status = response.status;  
        error.body = await response.json(); 
        throw error;
    }

    const data = await response.json();
    return data;
}

export async function Register(userRegistration){
    const response = await fetch(`${domain}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-control': 'no-cache',
        },
        body: JSON.stringify(userRegistration)
    });
        
    if (!response.ok) {
        const error = new Error('Register failed');
        error.status = response.status;  
        error.body = await response.json(); 
        throw error;
    }

    const data = await response.json();
    return data;
}

const createGraphQLClient = (token) => {
    return new GraphQLClient(domainGraphql, {
      headers: token ? {
        Authorization: `Bearer ${token}`,
      } : {},
    });
  };

export const getCategories = async(token) => {
    const client = createGraphQLClient(token);
    const query = `
    query {
        categories {
            id
            name
        }
    }
    `;
    try{
    const data = await client.request(query);
    return data.categories;
    } catch (error) {
        throw new Error('Get categories failed');
    }
}

export const getEventDetails = async(token) => {
    const client = createGraphQLClient(token);
    const query = `
    query {
      events {
        id
        title
        description
        date_start
        date_end
        categories {
          id
          category {
            name  
          }
        }
        feedbacks {
          id
          rating
          comments 
          feedback_date
          user {
            firstname
            lastname
          }
        }
      }
    }
    `;
    try{
    const data = await client.request(query);
    return data.events;
    } catch (error) {
        throw new Error('Get event details failed');
    }
}