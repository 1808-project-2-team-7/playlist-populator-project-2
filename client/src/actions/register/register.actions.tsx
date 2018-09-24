import history from '../../history';
import { registerTypes } from "./register.types";
import { environment } from '../../environment';

export const sendImageToDatabase = (file: any) => (dispatch: any) => {
  const formData = new FormData();
  formData.append('file', file);
  fetch(`${environment.context}storage/uploadFile`, {
    body: formData,
    method: 'POST'
  })
    .then(resp => resp.text())
    .then(bucketKey => {
      dispatch({
        payload: {
          bucketKey
        },
        type: registerTypes.UPDATE_BUCKETKEY
      })
    })
    .catch(error => {
      console.log(error);
    })
}

export const updateBucketKey = (url: string) => {
  return {
    payload: {
      bucketKey: url
    },
    type: registerTypes.UPDATE_BUCKETKEY
  }
}

export const updatePassword = (password: string) => {
  return {
    payload: {
      password
    },
    type: registerTypes.UPDATE_PASSWORD
  }
}

export const updateUsername = (username: string) => {
  return {
    payload: {
      username
    },
    type: registerTypes.UPDATE_USERNAME
  }
}

export const updateEmail = (email: string) => {
  return {
    payload: {
      email
    },
    type: registerTypes.UPDATE_EMAIL
  }
}

export const updateFirstName = (firstName: string) => {
  return {
    payload: {
      firstName
    },
    type: registerTypes.UPDATE_FIRST_NAME
  }
}

export const updateLastName = (lastName: string) => {
  return {
    payload: {
      lastName
    },
    type: registerTypes.UPDATE_LAST_NAME
  }
}

export const register = (e: React.FormEvent<HTMLFormElement>, userInfo: any) => {
  return (dispatch: any) => {
    e.preventDefault();
    const defaultBucketKey = 'https://s3.us-east-2.amazonaws.com/bubblewrap-images/1537665488116-default-user1.png';
    if( userInfo.bucketKey === ""){
      userInfo = {
        ...userInfo,
        bucketKey: defaultBucketKey
      }

    }
    return fetch(`${environment.context}users`, {
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
    })
      .then(resp => {
        return resp.json().then(data => ({ status: resp.status, body: data }))
      })
      .then(resp => {
        switch (resp.status) {
          case 201:
            dispatch({
              payload: {
                currentUser: resp.body,
                errorMessage: ''
              },
              type: registerTypes.REGISTER
            });
            history.push('/home');
            break;
          case 409:
            const error = resp.body && resp.body.errors;
            const duplicate = error && error.duplicate;
            const duplicateUsername = duplicate === 'username';
            const duplicateEmail = duplicate === 'email';
            if (duplicateUsername || duplicateEmail) {
              dispatch({
                payload: {
                  currentUser: null,
                  errorMessage: `${duplicateUsername ? 'Username ' + userInfo.username : 'Email ' + userInfo.email} is already taken. Please choose another.`
                },
                type: registerTypes.REGISTER
              });
              break;
            }
          default:
            throw new Error("Failed to login at this time");
        }
      })
      .catch(err => {
        dispatch({
          payload: {
            currentUser: null,
            errorMessage: 'Something went wrong. Please try again later.'
          },
          type: registerTypes.REGISTER
        });
        console.log(err);
      });
  }
}