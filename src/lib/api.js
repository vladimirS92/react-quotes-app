const FIREBASE_APIURL = 'https://react-demo-app-ae300-default-rtdb.europe-west1.firebasedatabase.app';

export const getAllQuotes = async () => {
  const response = await fetch(FIREBASE_APIURL + '/quotes.json');
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quotes.');
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }
  return transformedQuotes;
};

export const getSingleQuote = async (quoteId) => {
  const response = await fetch(FIREBASE_APIURL + '/quotes/' + quoteId + '.json');
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quote.');
  }

  const loadedQuote = {
    id: quoteId,
    ...data,
  };

  return loadedQuote;
};

export const addQuote = async (quoteData) => {
  const response = await fetch(FIREBASE_APIURL + '/quotes.json', {
    method: 'POST',
    body: JSON.stringify(quoteData),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add a quote.');
  }

  return null;
};

export const addComment = async (requestData) => {
  const response = await fetch(FIREBASE_APIURL + '/comments/' + requestData.quoteId + '.json', {
    method: 'POST',
    body: JSON.stringify(requestData.commentData),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add a comment.');
  }

  return { commentId: data.name };
};

export const getAllComments = async (quoteId) => {
  const response = await fetch(FIREBASE_APIURL + '/comments/' + quoteId + '.json');

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get comments.');
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
};
