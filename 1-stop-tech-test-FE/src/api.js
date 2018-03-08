const addMarketing = (sms, email, telephone, post, id) => {
  return fetch('http://localhost:3001/api/marketing_consent', {
    method: 'PUT',
    body: JSON.stringify({ sms, email, telephone, post, id }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res);
}

export default addMarketing