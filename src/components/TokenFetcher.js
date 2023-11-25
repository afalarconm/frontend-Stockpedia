import axios from 'axios';

const TokenFetcher = async (getAccessTokenSilently) => {
    try {
        const fetchedToken = await getAccessTokenSilently({
            audience: `https://stockpedia-api`,
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

const MgmTokenFetcher = async () => {
    const domain = 'dev-p1hsd7pae7fdnccq.us.auth0.com';
    const ClientID = 'CLlKoQTg5nY43McMoFacylzw1yr91Jsj'
    const ClientSecret = '0_ZLQAMRSv6IupaZ-LPSzVwkzVOyiR-x5i3j6T3Je7WFQ19dYo74UZVbWuOpe8Wh'

    try {
        const response = await axios.post(`https://${domain}/oauth/token`, {
            grant_type: 'client_credentials',
            client_id: ClientID,
            client_secret: ClientSecret,
            audience: 'https://dev-p1hsd7pae7fdnccq.us.auth0.com/api/v2/',
        });

        const token = response.data.access_token;
        return token;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};


export { TokenFetcher, MgmTokenFetcher };

