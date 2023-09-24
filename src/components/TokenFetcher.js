import axios from 'axios';

const TokenFetcher = async (getAccessTokenSilently) => {
    try {
        const domain = 'dev-p1hsd7pae7fdnccq.us.auth0.com';
        const fetchedToken = await getAccessTokenSilently({
            audience: `https://${domain}/api/v2/`,
            scope: 'read:current_user',
        });

        const token = fetchedToken;
        console.log('token', token)
        return token;
    } catch (error) {
        console.error(error);
        return null;
    }
};


const generateAuth0Token = async () => {
    const auth0Domain = 'dev-p1hsd7pae7fdnccq.us.auth0.com';  // Replace with your Auth0 domain
    const clientId = 'CLlKoQTg5nY43McMoFacylzw1yr91Jsj';  // Replace with your client ID
    const clientSecret = '0_ZLQAMRSv6IupaZ-LPSzVwkzVOyiR-x5i3j6T3Je7WFQ19dYo74UZVbWuOpe8Wh';  // Replace with your client secret
    const audience = `https://${auth0Domain}/api/v2/`;  // Audience for Auth0 Management API

    const options = {
        method: 'POST',
        url: `https://${auth0Domain}/oauth/token`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
            audience: audience
        })
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve Auth0 token');
    }
};

export { TokenFetcher, generateAuth0Token };

